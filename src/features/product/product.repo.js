import ProductModel from "./product.model.js";
import { getDB } from "../../config/mongodb.js";
export default class ProductRepo {
  constructor() {
    this.collection = "products";
  }
  async getAll() {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.find().toArray();
    } catch (err) {
      console.error("Error:", err);
    }
  }
  async add(name, price, image) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const newProduct = new ProductModel(name, price, image);
      await collection.insertOne(newProduct);
      return newProduct;
    } catch (err) {
      console.error("Error:", err);
    }
  }
}
