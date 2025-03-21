import { userModel } from "../models/user.Models.js";
import customError from "../utils/custom.Error.js";

export const getAllUsers = async (req, res, next) => {
    try {
      const findUsers = await userModel.find();
      if (!findUsers) {
        throw new customError( "users not found",400);
      }
  
      res.status(200).json({ success: true, message: "get all users successfully", users: findUsers });
    } catch (error) {
      next(error);
    }
};


export const deleteUsers = async (req, res, next) => {
    try {
        const {_id}=req.params
        console.log(_id,"id");
        
      const deleteUser = await userModel.findByIdAndDelete(_id);
      if (!deleteUser) {
        throw new customError(200, "user delete successfully");
      }

      res.status(200).json({ success: true, message: "delete users successfully"
        
       });
      
    } catch (error) {
      next(error);
    }
};


