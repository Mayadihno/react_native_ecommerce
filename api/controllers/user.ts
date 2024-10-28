import { Request, Response } from "express";
import {
  userAddressParams,
  userLoginParams,
  userModelParams,
} from "../dto/user";
import { userModel } from "../models/userModel";
import bcrypt from "bcryptjs";

export const createUser = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, phoneNumber } = <
    userModelParams
  >req.body;

  try {
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
      return;
    }
    const hashPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      email,
      password: hashPassword,
      firstName,
      lastName,
      phoneNumber,
    });

    res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = <userLoginParams>req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }

    const token = user._id;

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const createUserAddress = async (req: Request, res: Response) => {
  const { userAddressForm, getUserId } = <userAddressParams>req.body;
  try {
    const user = await userModel.findById(getUserId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    user.userAddressInfo.push(userAddressForm);
    await user.save();
    res.status(200).json({
      success: true,
      message: "User address created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUserAddress = async (req: Request, res: Response) => {
  const { getUserId } = req.params;

  try {
    const user = await userModel.findById(getUserId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: {
        addressInfo: user.userAddressInfo,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
