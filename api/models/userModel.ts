import mongoose from "mongoose";
import { userModelParams } from "../dto/user";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  userAddressInfo: [
    {
      city: String,
      region: String,
      deliveryInfo: String,
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const userModel = mongoose.model<userModelParams>("Users", userSchema);
