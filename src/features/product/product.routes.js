import express from "express";
import uploads from "../../middlewares/fileUpload.middleware.js";
import ProductController from "./product.controller.js";
import jswtAuth from "../../middlewares/jwtAuth.middleware.js";

const productRouter = express.Router();

const productController = new ProductController();

productRouter.get("/", (req, res) => {
  productController.getAllProducts(req, res);
});
productRouter.post("/rate", jswtAuth, (req, res) => {
  productController.rateProduct(req, res);
});
productRouter.get("/filter", (req, res) => {
  productController.filterProducts(req, res);
});
productRouter.get("/get/:_id", (req, res) => {
  productController.getOneProduct(req, res);
});
productRouter.post("/add", uploads.single("image"), (req, res) => {
  productController.addProduct(req, res);
});

export default productRouter;
