import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/ecomdb";
let client;
export function connectDB() {
  MongoClient.connect(url)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("Mongo db is Connnectd");
    })
    .catch((err) => {
      console.error("Error:", err);
    });
}
export function getdb() {
  return client.db();
}
