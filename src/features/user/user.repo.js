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
}
