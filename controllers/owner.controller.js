import uploadonImageKit from "../configs/imageKitupload.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Bike } from "../models/bike.model.js";

const changeRoletoOwner = asyncHandler( async(req,res)=>{
        await User.findByIdAndUpdate(req.user._id,{
            $set : {
                role : "owner"
            }
        })
       return res.status(200).json(
            new ApiResponse(200,{}, "Now you can List Your Vehicles")
        )
})

//API To List Bikes

const addBike = asyncHandler(async(req,res)=>{
      let bikeData = JSON.parse(req.body.bikeData)
      const imagelocalpath = req.file
      if(!imagelocalpath){
        throw new ApiError(400,'Bike image is required')
      }

      const imageUrl = await uploadonImageKit(imagelocalpath)

      const bike = await Bike.create({
        ...bikeData,
        owner : req.user._id,
        image : imageUrl
      })

      return res.status(201).json(
        new ApiResponse(201,bike,"Bike Listed Successfully")
      )
})


const getOwnerBikes = asyncHandler( async(req,res)=>{
     
      const bikes = await Bike.find({owner : req.user._id})

      return res.status(201).json(
        new ApiResponse(201,bikes,"All Bikes Are Lsited here")
      )
})

const toggleBikeAvailability = asyncHandler( async(req,res)=>{
      const {bikeId} = req.body;
      const bike = await Bike.findById(bikeId)

      if(!bike){
        throw new ApiError(404,"Bike not found!")
      }

      if(bike.owner.toString() !== req.user._id.toString()){
         new ApiResponse(401,{},"Unauthorized request")
      }

      bike.isAvailable = !bike.isAvailable;
      await bike.save()

      return res.status(200).json(
        new ApiResponse(200,bike.isAvailable,`Bike is ${bike.isAvailable}`)
      )
})

const DeleteBike = asyncHandler( async(req,res)=>{
     const {bikeId} = req.body;
     const bike = await Bike.findById(bikeId);

     if(!bike){
      throw new ApiError(404,"Bike not found!")
     }

     if(bike.owner.toString() !== req.user._id.toString()){
      throw new ApiError(401,"Unauthorized request")
     }

     bike.isAvailable = false;
     bike.owner = null;

     await bike.save()

     return res.status(200).json(
      new ApiResponse(201,{},"Biked listing deleted Successfully")
     )
})

//API to get Dashboard Data

const getDashboardData = asyncHandler( async(req,res)=>{
     const{role,_id} = req.body;

     if(role !== "owner"){
      throw new ApiError(401,"Unauthorized request")
     }

      const bikes = Bike.find({owner : _id})

      return res.status(201).json(
         new ApiResponse(201,bikes,"Dashboard data!!")
      )
})


export {addBike , changeRoletoOwner , getOwnerBikes , toggleBikeAvailability, DeleteBike , }