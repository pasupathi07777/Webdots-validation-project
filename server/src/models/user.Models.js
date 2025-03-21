import mongoose from 'mongoose'
import { hashData } from '../utils/bcrypt.js';

const userSchema=new mongoose.Schema({

    userName:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        unique:true,
        sparse: true,

    },
    email:{
        type:String,
        unique:true,
        sparse: true,
    },
    password:{
        type:String,
        required:true,
    }
    
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password =await hashData(this.password);
    next();
})

const userModel =mongoose.model("webdotUser",userSchema)

export {userModel}