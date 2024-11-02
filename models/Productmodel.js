import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "categories",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    shipping: {
      type: Boolean,
    },
    photoname: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", ProductSchema);
