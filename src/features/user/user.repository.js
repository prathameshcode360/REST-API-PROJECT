import UserModel from "./user.model.js";
import { getDB } from "../../config/mongodb.js";
export default class UserRepo {
  constructor() {
    this.collection = "users";
  }

  async register(name, email, password) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const newUser = new UserModel(name, email, password);
      await collection.insertOne(newUser);
      return newUser;
    } catch (err) {
      console.error("Error:", err);
    }
  }

  async login(email, password) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.findOne({ email, password });
    } catch (err) {
      console.error("Error:", err);
    }
  }
  async getAll() {
    const db = getDB();
    const collection = db.collection(this.collection);
    return await collection.find().toArray();
  }
}
