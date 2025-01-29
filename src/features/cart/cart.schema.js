import mongoose from "mongoose";

export const cartSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
    userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    quantity: { type: Number, required: true, min: 1 }, // Ensures quantity is at least 1
  },
  { timestamps: true }
); // Adds createdAt & updatedAt timestamps
