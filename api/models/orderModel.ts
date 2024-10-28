import { OrderParams } from "./../dto/order";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  product: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: [
        {
          type: String,
          required: true,
        },
      ],
    },
  ],
  shippingAddress: {
    city: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    deliveryInfo: {
      type: String,
      required: true,
    },
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const orderModel = mongoose.model<OrderParams>("Orders", orderSchema);

export default orderModel;
