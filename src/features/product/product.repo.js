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
    try {
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
    } catch (err) {
      throw err;
    }
  }

  async rate(productId, userId, rating) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);

      // Ensure valid ObjectId format for productId
      const objectIdProduct = new ObjectId(productId);

      // Attempt to update the product's rating
      const result = await collection.updateOne(
        { _id: objectIdProduct, "ratings.userId": userId }, // Match product and user
        { $set: { "ratings.$.rating": rating } } // Update the rating for the matched user
      );

      // If no match was found, push a new rating
      if (result.modifiedCount === 0) {
        await collection.updateOne(
          { _id: objectIdProduct },
          { $push: { ratings: { userId, rating } } }
        );
      }

      // Return the result of the update operation
      return result;
    } catch (err) {
      console.error("Error in rate:", err);
      throw err; // Rethrow the error to be caught in the controller
    }
  }
}
