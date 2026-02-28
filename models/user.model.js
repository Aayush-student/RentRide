import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    role : {
       type : String,
       enum : ["owner", "user"],
       default : "user"
    },
    image : {
        type : String,
        default : ''
    },
    refreshToken : {
        type : String
    }
},{timestamps : true})

userSchema.pre('save', async function(){
  if(!this.isModified("password")) return 
  this.password = await bcrypt.hash(this.password,10) 
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function(){
   return jwt.sign({
       _id : this.id,
       username : this.username,
       email : this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

userSchema.methods.generateRefreshToken = async function(){
    return jwt.sign({
        _id : this.id
    },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn : process.env.REFRESH_TOKEN_EXPIRY
  }

)
}


export const User = mongoose.model("User",userSchema)