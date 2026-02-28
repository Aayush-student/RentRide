import { Bike } from "../models/bike.model";
import { Booking } from "../models/booking.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/AsyncHandler";


const checkAvailability = async(pickUpDate,returnDate,bike)=>{
          const booking = await  Booking.find({
            bike : bike._id,
            pickUpDate : {$lte : returnDate},
            returnDate : {$gte : pickUpDate}
          })

          return !booking;
}

const checkAvailabilityOfBike = asyncHandler( async(req,res)=>{
    const {location,pickUpDate,returnDate} = req.body;

    const bikes = await Bike.find({location,isAvailable : true})

    if(!bikes){
        throw new ApiError(404,"No bikes found at selected location")
    }
  
    const bikesWithAvailability = await Promise.all(
        bikes.map(async (bike) =>{
            const isAvailable = await checkAvailability(bike,pickUpDate,returnDate);

            return {...bike._doc , isAvailable}
        })
    )

    const availableBikes = bikesWithAvailability.filter(
    bike => bike.isAvailable
);
   
return res.status(200).json(
    new ApiResponse(200, availableBikes, "Available bikes")
);

})

//Api to Create Booking
const createBooking = asyncHandler( async(req,res)=>{
    const {_id} = req.user;
    const {bike,pickUpDate,returnDate} = req.body;

    const isAvailable = await checkAvailability(bike,pickUpDate,returnDate)

    if(!isAvailable){
        throw new ApiError(404,"This vehicle isn't Available at selected Dates")
    }

    const bikeData = await Bike.findById(bike)

    const start = new Date(pickUpDate)
    const end   = new Date(returnDate)
    const pickedDays = Math.ceil(Math.abs((end-start)/1000 * 60 * 60 * 24))
    const totalPrice = pickedDays*bikeData.pricePerDay

    const bikeFullData = Booking.create({
        totalPrice,
        bike,
        pickUpDate,
        returnDate,
        owner : bikeData.owner,
        user : _id
    })

    return res.status(202).json(
        new ApiResponse(201,bikeFullData,"Booked!")
    )
})

//Api to List User Bookings

const getUserBookings = asyncHandler( async(req,res)=>{
     const {_id} = req.user;
     const bookings = Booking.find({user : _id}).populate('bike').sort({createdAt : -1})

     return res.status(201).json(
         new ApiResponse(201,bookings,"List of all Bikes Booked")
     )
})

//Api to get Owner Bookings
const getownerBookings = asyncHandler( async(req,res)=>{
    const {_id} = req.user;

    if(req.user.role !== 'owner'){
        throw new ApiError(201)
    }
    const ownerBookings = await Booking.find({owner : _id}).populate("bike").select("-user.password").sort({createdAt : -1})

     return res.status(201).json(
         new ApiResponse(201,bookings,"List of all Bikes Booked")
     )
})




export {checkAvailabilityOfBike, createBooking , getUserBookings}