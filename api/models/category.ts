import mongoose from "mongoose";
import { ICategoryObj } from "../dto/category";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    images: {
      type: [String],
      required: true,
    },
  },

  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },

    timestamps: true,
  }
);

export const categoryModel = mongoose.model<ICategoryObj>(
  "Categories",
  categorySchema
);
