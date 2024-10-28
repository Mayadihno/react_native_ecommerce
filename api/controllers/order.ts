import { Request, Response } from "express";
import { OrderParams } from "../dto/order";
import { userModel } from "../models/userModel";
import orderModel from "../models/orderModel";
import { productModel } from "../models/product";

export const createOrder = async (req: Request, res: Response) => {
  const { cartItems, paymentMethod, shippingAddress, totalPrice, userId } = <
    OrderParams
  >req.body;
  console.log(cartItems, paymentMethod, shippingAddress, totalPrice, userId);
  try {
    const user = await userModel.findById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const productObj = cartItems.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.images,
      id: item._id,
    }));
    const addNewOrder = new orderModel({
      userId,
      product: productObj,
      paymentMethod,
      shippingAddress,
      totalPrice,
    });

    await addNewOrder.save();
    cartItems.map(async (item) => {
      await productModel.findOneAndUpdate(
        { _id: item._id },
        { $inc: { quantity: -item.quantity } }
      );
    });

    res.status(200).json({
      success: true,
      message: "Order created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
