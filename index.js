import express from "express";
import bodyParser from "body-parser";
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import basicAuth from "./src/middlewares/basicAuth.middleware.js";
const app = express();

app.use(bodyParser.json());

app.use("/api/products/", basicAuth, productRouter);
app.use("/api/users/", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Express Server");
});

app.listen(4000, () => {
  console.log("server is running on port 4000");
});
