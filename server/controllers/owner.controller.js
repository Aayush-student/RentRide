import uploadonImageKit from "../configs/imageKitupload.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Bike } from "../models/bike.model.js";
import { Booking } from "../models/booking.model.js";

const ADMIN_EMAIL = process.env.ADMIN_MAIL;

const generateAccessandRefreshToken = async (userId) => {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
};

const changeRoletoOwner = asyncHandler(async (req, res) => {
    if (req.user.email !== ADMIN_EMAIL) {
        throw new ApiError(403, "Access Denied: Only the platform administrator can activate owner mode.");
    }

    await User.findByIdAndUpdate(req.user._id, {
        $set: { role: "owner" }
    });

    const { accessToken, refreshToken } = await generateAccessandRefreshToken(req.user._id);
    const updatedUser = await User.findById(req.user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    };

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, {
            user: updatedUser,
            accessToken,
            refreshToken
        }, "Admin Mode Activated"));
});

const addBike = asyncHandler(async (req, res) => {
    if (req.user.role !== "owner" || req.user.email !== ADMIN_EMAIL) {
        throw new ApiError(403, "Only the administrator can list new vehicles.");
    }

    if (!req.body.bikeData) {
        throw new ApiError(400, "Bike data is required");
    }

    let bikeData;
    try {
        bikeData = JSON.parse(req.body.bikeData);
    } catch (error) {
        throw new ApiError(400, "Invalid JSON format in bikeData");
    }

    const imagelocalpath = req.file;
    if (!imagelocalpath) {
        throw new ApiError(400, 'Bike image is required');
    }

    const imageUrl = await uploadonImageKit(imagelocalpath);

    const bike = await Bike.create({
        ...bikeData,
        owner: req.user._id,
        image: imageUrl
    });

    return res.status(201).json(
        new ApiResponse(201, bike, "Bike listed successfully")
    );
});

const getOwnerBikes = asyncHandler(async (req, res) => {
    const bikes = await Bike.find({ owner: req.user._id });

    return res.status(200).json(
        new ApiResponse(200, bikes, "Fleet fetched successfully")
    );
});

const toggleBikeAvailability = asyncHandler(async (req, res) => {
    const { bikeId } = req.body;
    const bike = await Bike.findById(bikeId);

    if (!bike) {
        throw new ApiError(404, "Bike not found!");
    }

    if (bike.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(401, "Unauthorized request");
    }

    bike.isAvailable = !bike.isAvailable;
    await bike.save();

    return res.status(200).json(
        new ApiResponse(200, bike.isAvailable, `Availability status updated`)
    );
});

const DeleteBike = asyncHandler(async (req, res) => {
    const { bikeId } = req.body;
    
    const bike = await Bike.findById(bikeId);

    if (!bike) {
        throw new ApiError(404, "Bike not found!");
    }

    if (bike.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(401, "Unauthorized request");
    }

    await Bike.findByIdAndDelete(bikeId);

    return res.status(200).json(
        new ApiResponse(200, {}, "Bike listing deleted permanently")
    );
});

const getDashboardData = asyncHandler(async (req, res) => {
    const { role, _id } = req.user;

    if (role !== "owner") {
        throw new ApiError(403, "Access Denied: Admin dashboard only");
    }

    const bikes = await Bike.find({ owner: _id });
    const bookings = await Booking.find({ owner: _id }).populate('bike').sort({ createdAt: -1 });

    const pendingBookings = await Booking.find({ owner: _id, status: "pending" });
    const completedBookings = await Booking.find({ owner: _id, status: "confirmed" });

    const monthlyRevenue = bookings
        .filter(booking => booking.status === "confirmed")
        .reduce((acc, booking) => acc + (booking.price || 0), 0);

    const dashBoardData = {
        totalBikes: bikes.length,
        totalBookings: bookings.length,
        pendingBookings: pendingBookings.length,
        completedBookings: completedBookings.length,
        recentBookings: bookings.slice(0, 3),
        monthlyRevenue
    };

    return res.status(200).json(
        new ApiResponse(200, dashBoardData, "Dashboard statistics loaded")
    );
});

const updateUserImage = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const userimage = req.file;

    if (!userimage) {
        throw new ApiError(400, "Image file is required");
    }

    const userImageUrl = await uploadonImageKit(userimage);

    const updatedUser = await User.findByIdAndUpdate(
        _id,
        { image: userImageUrl },
        { new: true }
    ).select("-password -refreshToken");

    return res.status(200).json(
        new ApiResponse(200, updatedUser, "Profile image updated")
    );
});

export { 
    addBike, 
    changeRoletoOwner, 
    getOwnerBikes, 
    toggleBikeAvailability, 
    DeleteBike, 
    getDashboardData, 
    updateUserImage 
};