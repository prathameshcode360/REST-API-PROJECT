import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/ecomdb";
let client;
export default function connectToDb() {
  MongoClient.connect(url)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.error("Error:", err);
    });
}
