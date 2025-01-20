import express from "express";
import bodyParser from "body-parser";
import productRouter from "./src/features/product/product.routes.js";

const app = express();

app.use(bodyParser.json());

app.use("/api/products/", productRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Express Server");
});

app.listen(4000, () => {
  console.log("server is running on port 4000");
});
