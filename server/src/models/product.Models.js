import mongoose from 'mongoose'


const productSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        sparse: true,
    },
    description:{
        type:String,
        sparse: true,
    }
    
})



export const productModel =mongoose.model("webdotProduct",productSchema)

