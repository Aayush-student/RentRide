import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js"


const generateAccessandRefreshToken = async(userId)=>{
    const user = await User.findById(userId)

    const accessToken = await user.generateAccessToken()
    const refreshToken = await user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({validateBeforeSave : false})

    return {accessToken,refreshToken}
}

const registerUser = asyncHandler( async(req,res)=>{
    const {username,email,password} = req.body
    
    if([username,email,password].some((field)=> field?.trim() === "")){
        throw new ApiError(400,"All fields are required")
    }
     
    const existedUser = await User.findOne({
        $or : [{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User already Exists")
    }

    const user = await User.create({
        username : username.toLowerCase(),
        email,
        password
    })

    const { accessToken,refreshToken} = await generateAccessandRefreshToken(user._id)
    
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly : true,
        secure : true
    }

   return res.status(200).cookie("accessToken",accessToken, options).cookie("refreshToken",refreshToken, options).json(
    new ApiResponse(200,
        {
            user : createdUser,
            accessToken,
            refreshToken
        }
        ,"User Registered Successfully!")
   )





})

const loginUser = asyncHandler( async (req,res) =>{
    const {email,password} = req.body

    if([email,password].some((field)=> field?.trim() === "")){
        throw new ApiError(400,"All fields are required")
    }

    const user =await User.findOne({email})

    if(!user){
        throw new ApiError(400,"User doesn't exists..")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    
    if(!isPasswordValid){
        throw new ApiError(401,"Invalid User Credentials")
    }

    const {accessToken, refreshToken} = await generateAccessandRefreshToken(user._id)

    const loggedinUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly : true,
        secure : true
    }

    return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json(new ApiResponse(
        200,
        {
            user : loggedinUser,
            accessToken,
            refreshToken
        }
        ,
        "Logged in Successfully"
    ))


})

const getUserData = asyncHandler( async(req,res)=>{
    const {user} = req;
    return res.json({
        success : true, user
    })
})


export {loginUser, registerUser, getUserData}