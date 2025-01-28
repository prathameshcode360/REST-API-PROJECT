import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import ProductModel from "./product.model.js";

export default class ProductRepo {
  constructor() {
    this.collection = "products";
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
  async getAll() {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.find().toArray();
    } catch (err) {
      console.error("Error:", err);
    }
  }
  async getOne(_id) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.findOne({ _id: new ObjectId(_id) });
    } catch (err) {
      console.log("Error:", err);
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
  async rate(userId, productId, rating) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);

      // Use $push to add { userId, rating } as an object in the ratings array
      await collection.updateOne(
        { _id: new ObjectId(productId) },
        {
          $push: { ratings: { userId, rating } }, // Corrected here
        }
      );
    } catch (err) {
      console.error("Error:", err);
    }
  }
}
