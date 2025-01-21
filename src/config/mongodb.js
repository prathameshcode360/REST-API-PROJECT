// import { MongoClient } from "mongodb";

// const url = "mongodb://localhost:27017/ecomdb";
// let client;
// export function connectToMongoDb() {
//   MongoClient.connect(url)
//     .then((clientInstance) => {
//       client = clientInstance;
//       console.log("Mongodb is connected");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

// export function getDb() {
//   return client.db();
// }

import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/ecomdb";

let client;

export function connectToMongoDb() {
  MongoClient.connect(url)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("mongo db is connected is successfully");
    })
    .catch((err) => {
      console.error("Error:", err);
    });
}

export function getDB() {
  return client.db();
}
