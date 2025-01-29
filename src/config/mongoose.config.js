import mongoose from "mongoose";

const url = process.env.DB_URL;

export async function connectUsingMongoose() {
  try {
    if (!url) throw new Error("DB_URL is not defined in environment variables");

    await mongoose.connect(url); // No need for useNewUrlParser

    console.log("MongoDB using Mongoose is connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}
