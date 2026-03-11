import { Router } from "express";
import { verifyjwt } from "../middlewares/auth.middleware.js";
import { 
    changeRoletoOwner, 
    DeleteBike, 
    getDashboardData, 
    toggleBikeAvailability, 
    updateUserImage, 
    addBike, 
    getOwnerBikes 
} from "../controllers/owner.controller.js";
import upload from "../middlewares/mutler.middleware.js";

const ownerRouter = Router();

ownerRouter.route('/change-role').patch(verifyjwt, changeRoletoOwner)
ownerRouter.route('/add-bike').post(verifyjwt, upload.single("image"), addBike)
ownerRouter.route('/bikes').get(verifyjwt, getOwnerBikes)
ownerRouter.route('/toggle-bike').post(verifyjwt, toggleBikeAvailability)
ownerRouter.route('/delete-bike').delete(verifyjwt, DeleteBike)
ownerRouter.route('/dashboard').get(verifyjwt, getDashboardData)
ownerRouter.route('/update-userimage').patch(verifyjwt, upload.single("image"), updateUserImage)

export { ownerRouter }