import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Required
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [
      /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email",
    ], // Fixed match
  },
  password: {
    type: String,
    required: true,
  },

  // type: { type: String, enum: ["seller", "customer"], required: true }, // Required
});
userSchema.pre("save", function (next) {
  console.log("Password before saving:", this.password);
  next();
});
