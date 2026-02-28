import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db/index.js"
const app = express();
import cookieParser from "cookie-parser";
import userRouter from "./Routes/userRoute.js";
import { ownerRouter } from "./Routes/ownerRoutes.js";
import mongoose from "mongoose";
const port = process.env.PORT || 3000;

dotenv.config({
    path : "./.env"
})

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.urlencoded({limit : "16kb", extended : true}))

app.use(express.json({limit : "16kb"}))
app.use(cookieParser())

app.use(express.static('Public'))

connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`listening on port ${port}`)
    })
}).catch((error)=>{
    console.log("Error",error)
})

app.use('/api/user',userRouter)
app.use('/api/owner',ownerRouter)

export default app

