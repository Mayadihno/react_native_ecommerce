import express from "express";
import multer from "multer";
import path from "path";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
} from "../controllers";

const router = express.Router();

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      req.body.name + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const images = multer({ storage: imageStorage }).array("images");

router.post("/createCategory", images, createCategory);
router.get("/getCategoryById/:id", getCategoryById);
router.get("/getAllCategories", getAllCategory);
router.put("/updateCategory/:id", images, updateCategory);
router.delete("/deleteCategory/:id", deleteCategory);
export { router as categoryRoute };
