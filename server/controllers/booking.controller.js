import { Bike } from "../models/bike.model.js";
import { Booking } from "../models/booking.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const checkAvailability = async (bikeId, pickUpDate, returnDate) => {
    const conflictingBooking = await Booking.findOne({
        bike: bikeId,
        status: { $ne: 'cancelled' }, 
        pickUpDate: { $lte: returnDate },
        returnDate: { $gte: pickUpDate }
    });

    return !conflictingBooking; 
}

const checkAvailabilityOfBike = asyncHandler(async (req, res) => {
    const { location, pickUpDate, returnDate } = req.body;

    const bikes = await Bike.find({ location, isAvailable: true });

    if (!bikes.length) {
        return res.status(200).json(new ApiResponse(200, [], "No bikes found at this location"));
    }
  
    const bikesWithAvailability = await Promise.all(
        bikes.map(async (bike) => {
            const isAvailable = await checkAvailability(bike._id, pickUpDate, returnDate);
            return { ...bike._doc, isAvailable };
        })
    );

    const availableBikes = bikesWithAvailability.filter(bike => bike.isAvailable);
   
    return res.status(200).json(
        new ApiResponse(200, availableBikes, "Available bikes fetched successfully")
    );
});

const createBooking = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { bike, pickUpDate, returnDate } = req.body;

    const isAvailable = await checkAvailability(bike, pickUpDate, returnDate);

    if (!isAvailable) {
        throw new ApiError(400, "This vehicle isn't available for the selected dates");
    }

    const bikeData = await Bike.findById(bike);
    if (!bikeData) {
        throw new ApiError(404, "Bike not found");
    }

    const start = new Date(pickUpDate);
    const end = new Date(returnDate);

    if (isNaN(start) || isNaN(end)) {
        throw new ApiError(400, "Invalid date format");
    }

    const diffInMs = end - start;
    if (diffInMs < 0) {
        throw new ApiError(400, "Return date cannot be before pick-up date");
    }

    const millisecondsPerDay = (1000 * 60 * 60 * 24);
    const pickedDays = Math.max(1, Math.ceil(diffInMs / millisecondsPerDay));
    const totalPrice = pickedDays * bikeData.pricePerDay;

    const booking = await Booking.create({
        price: totalPrice, 
        bike,
        pickUpDate,
        returnDate,
        owner: bikeData.owner,
        user: _id
    });

    return res.status(201).json(
        new ApiResponse(201, booking, "Booking created successfully")
    );
});

const getUserBookings = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const bookings = await Booking.find({ user: _id })
        .populate('bike')
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, bookings, "User bookings fetched successfully")
    );
});

const getOwnerBookings = asyncHandler(async (req, res) => {
    const { _id } = req.user;

    if (req.user.role !== 'owner') {
        throw new ApiError(403, "Access denied. Owners only");
    }
    
    const ownerBookings = await Booking.find({ owner: _id })
        .populate("bike")
        .populate("user", "-password")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, ownerBookings, "Owner bookings fetched successfully")
    );
});

const changeBookingStatus = asyncHandler(async (req, res) => {
    const { bookingId, status } = req.body;
    
    const booking = await Booking.findById(bookingId);
    
    if(!booking) {
        throw new ApiError(404, "Booking not found");
    }

    if (booking.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(401, "Unauthorized request");
    }

    booking.status = status;
    await booking.save();

    return res.status(200).json(
        new ApiResponse(200, booking, "Booking status updated")
    );
});

export { 
    checkAvailabilityOfBike, 
    createBooking, 
    getUserBookings, 
    getOwnerBookings, 
    changeBookingStatus 
};