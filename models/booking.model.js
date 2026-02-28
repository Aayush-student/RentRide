import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    bike : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Bike",
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    pickUpDate : {
        type : Date,
        required : true
    },
    returnDate : {
        type : Date,
        required : true
    },
    status : {
        type : String,
        enum : ["pending", "confirmed", "cancelled"],
        default : "pending"
    },
    price : {
        type : Number,
        required : true
    }
},{timestamps : true})

export const Booking = mongoose.model("Booking",bookingSchema)