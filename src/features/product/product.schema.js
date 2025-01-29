import mongoose from "mongoose";

export const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 }, // Ensuring price is a positive number
    image: { type: String, required: true }, // Assuming this is an image URL or path
    category: { type: String, required: true },
  },
  { timestamps: true }
); // Adds createdAt & updatedAt timestamps
