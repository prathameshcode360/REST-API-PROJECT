import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/ecombdb";
let client;
export function connectToMongoDb() {
  MongoClient.connect(url)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("mongo db connected successfully");
    })
    .catch((err) => {
      console.error("Error:", err);
    });
}

export function getDB() {
  return client.db();
}
