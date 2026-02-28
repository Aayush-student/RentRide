import { Router } from "express";
import { verifyjwt } from "../middlewares/auth.middleware.js";
import { changeRoletoOwner, DeleteBike, toggleBikeAvailability } from "../controllers/owner.controller.js";
import upload from "../middlewares/mutler.middleware.js";
import { addBike } from "../controllers/owner.controller.js";
import { getOwnerBikes } from "../controllers/owner.controller.js";

const ownerRouter = Router();

ownerRouter.route('/change-role').post(verifyjwt,changeRoletoOwner)
ownerRouter.route('/add-bike').post(verifyjwt,upload.single("image"),addBike)
ownerRouter.get('/bikes').post(verifyjwt,getOwnerBikes)
ownerRouter.route('/toggle-bike').post(verifyjwt,toggleBikeAvailability)
ownerRouter.route('/delete-bike').post(verifyjwt,DeleteBike)
export {ownerRouter}