import UserModel from "./user.model.js";
import { getDB } from "../../config/mongodb.js";

export default class UserRepository {
  async register(name, email, password) {
    try {
      const db = getDB();
      const collection = db.collection("users");
      const newUser = new UserModel(name, email, password);
      await collection.insertOne(newUser);
      return newUser;
    } catch (err) {
      console.error("Error:", err);
    }
  }
  async login(email) {
    try {
      const db = getDB();
      const collection = db.collection("users");
      const user = await collection.findOne({ email });
      return user;
    } catch (err) {
      console.error("Error:", err);
    }
  }
  async getAll() {
    try {
      const db = getDB();
      const collection = db.collection("users");
      return await collection.find().toArray();
    } catch (err) {
      console.error("Error:", err);
    }
  }
}
