import { MongoClient } from "mongodb";

const url = process.env.DB_URL;
let client;
export function connectToDb() {
  MongoClient.connect(url)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.error("Error:", err);
    });
}

export function getDB() {
  return client.db();
}
