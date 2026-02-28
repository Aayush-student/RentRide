import { Router } from "express";
import { getUserData, loginUser, registerUser } from "../controllers/user.controller.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route('/register').post(registerUser)
userRouter.route('/login').post(loginUser)
userRouter.get('/data',verifyjwt,getUserData)
export default userRouter;