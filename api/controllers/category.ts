import { Request, Response } from "express";
import { ICategoryObj, IUpdateCategory } from "../dto/category";
import { categoryModel } from "../models/category";

export const createCategory = async (req: Request, res: Response) => {
  const { name } = <ICategoryObj>req.body;
  const files = req.files as [Express.Multer.File];
  const path = "http://192.168.43.206:8084/assets/";
  const images = files.map((file: Express.Multer.File) => path + file.filename);

  try {
    await categoryModel.create({
      name,
      images,
    });

    res.status(200).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await categoryModel.findById(id);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const result = await categoryModel.find();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id, name } = <IUpdateCategory>req.body;
  const files = req.files as [Express.Multer.File];

  try {
    if (!id) {
      res.status(400).json({
        success: false,
        message: "Id is required",
      });
      return;
    }

    const category = await categoryModel.findById(id);
    if (!category) {
      res.status(404).json({
        success: false,
        message: "category not found",
      });
      return;
    }

    if (files) {
      const images = files.map((file: Express.Multer.File) => file.filename);
      const catUpdate = await categoryModel.findByIdAndUpdate(
        id,
        {
          name: name,
          images: images,
        },
        {
          new: true,
        }
      );
      if (!catUpdate) {
        res.status(404).json({
          success: false,
          message: "Category not updated",
        });
        return;
      }
      res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: catUpdate,
      });
    } else {
      const catUpdate = await categoryModel.findByIdAndUpdate(
        id,
        {
          name: name,
        },
        {
          new: true,
        }
      );
      if (!catUpdate) {
        res.status(404).json({
          success: false,
          message: "Category not updated",
        });
        return;
      }
      res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: catUpdate,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await categoryModel.findById(id);
    if (!category) {
      res.status(404).json({
        success: false,
        message: "category not found",
      });
      return;
    }
    await categoryModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
