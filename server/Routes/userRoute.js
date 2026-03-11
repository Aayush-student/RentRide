import { Router } from "express";
import { getBikes, getUserData, loginUser, registerUser } from "../controllers/user.controller.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route('/register').post(registerUser)
userRouter.route('/login').post(loginUser)
userRouter.route('/data').get(verifyjwt, getUserData)
userRouter.route('/getbikes').get(getBikes)

export default userRouter;