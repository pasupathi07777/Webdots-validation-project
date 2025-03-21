import { userModel } from "../models/user.Models.js";
import { generateToken } from "../utils/jwt.js";
import customError from "../utils/custom.Error.js";
import { compareHashData } from "../utils/bcrypt.js";
import validator from 'validator'

export const createUser = async (req, res, next) => {
  try {
    const { userName, email, password, number } = req.body;
    
    

    if (!userName || !password || (!email && !number)) {
      throw new customError(400, "all Feilds Required");
    } 
    else if (userName && userName.length<5) {
      throw new customError(400, "Username must be at least 5 characters long. ");
    }
    else if (email && !validator.isEmail(email)) {
      throw new customError(400, "enter a valid Gmail ");
    }
     else if (number && String(number).length !== 10) {
      throw new customError(400, "enter valid mobile number");
    }
     else if (password.length < 8) {
      throw new customError(400, "minimum 8 character ne,ed");
    }

    const query = email ? { email } : { number };
    let exixtUser = await userModel.findOne(query);
    if (exixtUser) {
      throw new customError(400, "email or number already exits");
    }

    const userData = { userName, password };
    if (email) userData.email = email;
    if (number) userData.number = number;
    const user = await userModel.create(userData);

    if (user) {
      res.status(201).json({ success: true, message: "Registed Successfully" });
    }
  } catch (error) {


    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password, number } = req.body;

    if (!password || (!email && !number)) {
      throw new customError(400, "all Feilds Required");
    } else if (email && !validator.isEmail(email)) {
      throw new customError(400, "enter a valid Gmail ");
    } else if (number && String(number).length !== 10) {
      throw new customError(400, "enter valid mobile number");
    }

    const query = email ? { email } : { number };
    const user = await userModel.findOne(query);

    if (!user) {
      throw new customError(400, "email not found");
    }

    const comparePassword = await compareHashData(password, user.password);
    if (!comparePassword) {
      throw new customError(400, "Invalid password");
    }

    const token = await generateToken(user._id);

    if (user) {
      res
        .status(200)
        .json({ success: true, message: "login Successfully", user, token });
    }
  } catch (error) {

    next(error);
  }
};

export const checkAuth = async (req, res, next) => {
  try {
    res.status(200).json({ succces: true, user: req.user });
  } catch (error) {
    next(500, "Internal server error");
  }
};
