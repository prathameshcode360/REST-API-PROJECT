import ProductModel from "./product.model.js";
import { getDB } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";
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
  async add(name, price, image, category) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const newProduct = new ProductModel(name, price, image, category);
      await collection.insertOne(newProduct);
      return newProduct;
    } catch (err) {
      console.error("Error:", err);
    }
  }
  async get(_id) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const product = await collection.findOne({ _id: new ObjectId(_id) });
      return product;
    } catch (error) {
      throw error;
    }
  }
  async filter(minPrice, maxPrice, category) {
    const db = getDB();
    const collection = db.collection(this.collection);
    const filterExpression = {};

    // Combine minPrice and maxPrice in a single object for price
    if (minPrice || maxPrice) {
      filterExpression.price = {};
      if (minPrice) {
        filterExpression.price.$gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        filterExpression.price.$lte = parseFloat(maxPrice);
      }
    }
    // Add category filter if provided
    if (category) {
      filterExpression.category = category;
    }
    return await collection.find(filterExpression).toArray();
  }
}
