import express from "express";
import uploads from "../../middlewares/fileUpload.middleware.js";
import ProductController from "./product.controller.js";

const productRouter = express.Router();

const productController = new ProductController();

productRouter.get("/", productController.getAllProducts);
productRouter.get("/filter", productController.filterProducts);
productRouter.get("/get/:id", productController.getOneProduct);
productRouter.post(
  "/add",
  uploads.single("image"),
  productController.addProduct
);

export default productRouter;
