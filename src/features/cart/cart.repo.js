import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
export default class CartRepo {
  constructor() {
    this.collection = "cart";
  }
  async add(productId, userId, quantity) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const cartItem = await collection.insertOne({
        productId: new ObjectId(productId),
        userId: new ObjectId(userId),
        quantity,
      });
      return cartItem;
    } catch (err) {
      throw err;
    }
  }
  async getAll(userId) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.find({ userId: new ObjectId(userId) }).toArray();
    } catch (err) {
      console.log("Error:", err);
    }
  }
  async delete(cartItemId) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const result = await collection.deleteOne({
        _id: new ObjectId(cartItemId),
      });

      return result.deletedCount > 0;
    } catch (err) {
      console.error("Error:", err);
      return false; // Returning false in case of an error to indicate failure
    }
  }
}
