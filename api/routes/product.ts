import express from "express";
import multer from "multer";
import path from "path";
import {
  createProduct,
  getAllProduct,
  getFeaturedProduct,
  getProductByCatId,
  getproductById,
  getTrendingProduct,
  getWelcomeProduct,
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

router.post("/createProduct", images, createProduct);
router.get("/getProductByCatId/:catId", getProductByCatId);
router.get("/getAllProduct", getAllProduct);
router.get("/getProductById/:id", getproductById);
router.get("/featuredProduct", getFeaturedProduct);
router.get("/trendingProduct", getTrendingProduct);
router.get("/welcomeProduct", getWelcomeProduct);
export { router as productRoute };
