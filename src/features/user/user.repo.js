import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";

const UserModel = mongoose.model("User", userSchema); // ✅ Fix: Remove `new`

export default class UserRepo {
  async register(userData) {
    // Accepts user details
    try {
      const newUser = new UserModel(userData); // ✅ Fix: Pass user data
      await newUser.save();
      return newUser; // Return created user (optional)
    } catch (err) {
      throw err;
    }
  }

  async login(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (err) {
      throw err;
    }
  }
  async getAll() {
    try {
      return await UserModel.find();
    } catch (err) {
      throw err;
    }
  }
}
