import { getDB } from "../../config/mongodb.js";

export default class UserRepo {
  constructor() {
    this.collection = "users";
  }
  async register(newUser) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      await collection.insertOne(newUser);
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
  async get() {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.find().toArray();
    } catch (err) {
      console.error("Error:", err);
    }
  }
}
