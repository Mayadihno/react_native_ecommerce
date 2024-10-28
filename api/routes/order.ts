import express from "express";
import { createOrder } from "../controllers";
const router = express.Router();

router.post("/createOrder", createOrder);

export { router as orderRoute };
