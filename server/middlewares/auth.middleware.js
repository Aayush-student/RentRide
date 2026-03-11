import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
const verifyjwt = asyncHandler( async(req,res,next)=>{
    try{
      const incomingAccessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer " , "")
       
      if(!incomingAccessToken){
        throw new ApiError(401,"Unauthorized request")
      }

      const decodedToken = jwt.verify(incomingAccessToken,process.env.ACCESS_TOKEN_SECRET)

      const user = await User.findById(decodedToken._id).select("-password -refreshToken")
      
      if(!user){
        throw new ApiError(401,"Invalid Access Token: User no longer exists")
      }

      req.user = user;
      next()

    }
    catch(error){
      throw new ApiError(401,error.message)
    }
})

export {verifyjwt}