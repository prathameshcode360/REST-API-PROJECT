import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";

const UserModel = mongoose.model("User", userSchema); // ✅ Fix: Remove `new`

export default class UserRepo {
  async register(userData) {
    try {
      const newUser = new UserModel(userData);
      await newUser.save();
      return newUser;
    } catch (err) {
      if (err.name === "ValidationError") {
        let messages = Object.values(err.errors).map((val) => val.message);
        throw new Error(messages.join(", ")); // Combine multiple validation messages
      }
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
  async reset(userId, newPassword) {
    try {
      let user = await UserModel.findById(userId);
      if (user) {
        user.password = newPassword;
        user.save();
      } else {
        throw new Error("user no found");
      }
    } catch (err) {
      throw err;
    }
  }
}
