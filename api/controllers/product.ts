import { Request, Response } from "express";
import { ProductListParams } from "../dto/product";
import { productModel } from "../models/product";
import mongoose from "mongoose";

export const createProduct = async (req: Request, res: Response) => {
  const {
    name,
    price,
    oldPrice,
    isFeatured,
    inStock,
    category,
    description,
    quantity,
  } = <ProductListParams>req.body;
  const files = req.files as [Express.Multer.File];
  const path = "http://192.168.43.206:8084/assets/";
  const images = files.map((file: Express.Multer.File) => path + file.filename);

  try {
    await productModel.create({
      name,
      images,
      price,
      oldPrice,
      isFeatured,
      inStock,
      category,
      description,
      quantity,
    });

    res.status(200).json({
      success: true,
      message: "Product created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getProductByCatId = async (req: Request, res: Response) => {
  const { catId } = req.params;

  try {
    let data;

    if (catId && mongoose.Types.ObjectId.isValid(catId)) {
      data = await productModel.find({ category: catId });
    } else {
      data = await productModel.find().limit(10);
    }
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const data = await productModel.find().limit(10);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getproductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await productModel.findById(id);
    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getFeaturedProduct = async (req: Request, res: Response) => {
  try {
    const products = await productModel.find({ isFeatured: true });
    if (!products) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getTrendingProduct = async (req: Request, res: Response) => {
  try {
    const products = await productModel
      .find({ isFeatured: true })
      .sort({ createdAt: -1 })
      .limit(8);
    if (!products) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getWelcomeProduct = async (req: Request, res: Response) => {
  try {
    const products = await productModel
      .find({ price: { $gte: 20000 } })
      .sort({ createdAt: -1 })
      .limit(6);
    if (!products) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
