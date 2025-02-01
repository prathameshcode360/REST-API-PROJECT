import mongoose from "mongoose";
import { productSchema } from "./product.schema.js";
import { reviewSchema } from "./reviews.schemas.js";

const ProductModel = mongoose.model("Product", productSchema);
const ReviewModel = mongoose.model("Review", reviewSchema);

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
      // 1. Check if the product exists
      const productToRate = await ProductModel.findById(
        new mongoose.Types.ObjectId(productId)
      );
      if (!productToRate) {
        throw new Error("Product not found");
      }

      // 2. Get the existing review
      const userReview = await ProductModel.findOne({
        product: new mongoose.Types.ObjectId(productId),
        user: new mongoose.Types.ObjectId(userId),
      });

      if (userReview) {
        userReview.rating = rating;
        await userReview.save();
      } else {
        const newReview = new ReviewModel({
          product: new mongoose.Types.ObjectId(productId),
          user: new mongoose.Types.ObjectId(userId),
          rating: rating,
        });
        await newReview.save();
      }
    } catch (err) {
      console.error("Error in rate:", err);
      throw err;
    }
  }
}
