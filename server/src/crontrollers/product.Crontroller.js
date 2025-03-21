import { productModel } from "../models/product.Models.js";
import cloudinary from "../utils/cloudinary.js";
import customError from "../utils/custom.Error.js";


export const getAllProducts = async (req, res, next) => {
  try {
    const findProducts = await productModel.find();
    if (!findProducts) {
      throw new customError("products not found", 400);
    }

    res.status(200).json({
      success: true,
      message: "get all products successfully",
      products: findProducts,
    });
  } catch (error) {
    next(error);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const { name, image, description } = req.body;

    if (!name || !image || !description) {
      throw new customError(400, "All fields are required");
    }

    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "products",
    });

    const product = await productModel.create({
      name,
      image: uploadResponse.secure_url,
      description,
    });

    if (!product) {
      throw new customError(400, "product add failed");
    }

    res
      .status(200)
      .json({ success: true, message: "product add successfully" ,product});
  } catch (error) {
    next(error);
  }
};


export const editProduct = async (req, res, next) => {
  try {
    const { name, image, description } = req.body;
    const {_id} = req.params;

    if (!name || !image || !description) {
      throw new customError(400, "All fields are requireds");
    }

    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "products",
    });

    const product = await productModel.findByIdAndUpdate(_id,{
      name,
      image: uploadResponse.secure_url,
      description,
    },
    { new: true } );

    if (!product) {
      throw new customError(400, "product edit failed");
    }

    res
      .status(200)
      .json({ success: true, message: "product updated successfully",product });
  } catch (error) {
    next(error);
  }
};





export const deleteProduct = async (req, res, next) => {
  try {
    const { _id } = req.params;
    console.log(_id, "id");

    const deleteUser = await productModel.findByIdAndDelete(_id);
    if (!deleteUser) {
      throw new customError(400, "user delete successfully");
    }

    res
      .status(200)
      .json({ success: true, message: "delete users successfully" });
  } catch (error) {
    next(error);
  }
};
