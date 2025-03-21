import { userModel } from "../models/user.Models.js";
import customError from "../utils/custom.Error.js";
import { verifyJwtToken } from "../utils/jwt.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.query;
    
    if (!token) {
      throw new customError(400,"unauthorized");
    }
    const tokenCheck = await verifyJwtToken(token);

    if (!tokenCheck) {
      throw customError(400, "unauthorized token");
    }

    const user=await userModel.findById(tokenCheck.userId).select('-password')

    if(!user){
        throw new customError(400, "unauthorized token");
    }

    req.user=user

    next()
    
  } catch (error) {
    next(error);
  }
};
