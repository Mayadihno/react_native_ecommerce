import express from "express";
import {
  createUser,
  createUserAddress,
  getUserAddress,
  login,
} from "../controllers";
const router = express.Router();

router.post("/createUser", createUser);
router.post("/login", login);
router.post("/addAddress", createUserAddress);
router.get("/getUserAddress/:getUserId", getUserAddress);

export { router as authRoute };
