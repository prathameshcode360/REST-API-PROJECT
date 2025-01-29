import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Required
  email: { type: String, required: true, unique: true, lowercase: true }, // Lowercase to prevent duplication
  password: { type: String, required: true }, // Required
  //   type: { type: String, enum: ["seller", "customer"], required: true }, // Required
});
