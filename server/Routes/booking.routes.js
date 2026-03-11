import { Router } from "express";
import { 
    changeBookingStatus, 
    checkAvailabilityOfBike, 
    createBooking, 
    getOwnerBookings, 
    getUserBookings 
} from "../controllers/booking.controller.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";

const bookingRouter = Router()

bookingRouter.route('/check-availability').post(checkAvailabilityOfBike)
bookingRouter.route('/create').post(verifyjwt, createBooking)
bookingRouter.route('/user').get(verifyjwt, getUserBookings)
bookingRouter.route('/owner').get(verifyjwt, getOwnerBookings)
bookingRouter.route('/change-status').post(verifyjwt, changeBookingStatus)

export { bookingRouter }