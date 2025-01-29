import ProductRepo from "./product.repo.js";
import ProductModel from "./product.model.js";

export default class ProductController {
  constructor() {
    this.productRepo = new ProductRepo();
  }
  async getAllProducts(req, res) {
    try {
      let products = await this.productRepo.getAll();
      return res.status(200).send(products);
    } catch (err) {
      console.error("Error:", err);
    }
  }
  async addProduct(req, res) {
    try {
      const { name, price, category } = req.body;
      const image = req.file.filename;
      const newProduct = await this.productRepo.add(
        name,
        Number(price),
        image,
        category
      );
      return res.status(201).send({
        msg: "Product added successfully",
        product: newProduct,
      });
    } catch (err) {
      throw err;
    }
  }
  async getOneProduct(req, res) {
    try {
      const _id = req.params._id;
      const product = await this.productRepo.get(_id);
      if (!product) {
        return res.status(404).send({
          msg: "Product not found",
        });
      } else {
        return res.status(200).send({
          msg: "product found",
          product: product,
        });
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }
  async filterProducts(req, res) {
    try {
      const minPrice = Number(req.query.minPrice);
      const maxPrice = Number(req.query.maxPrice);
      const category = req.query.category;

      let result = await this.productRepo.filter(minPrice, maxPrice, category);
      if (result.length === 0) {
        return res.status(404).send({
          msg: "No products found",
        });
      } else {
        return res
          .status(200)
          .send({ msg: "filtered Products", products: result });
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }
  async rateProduct(req, res) {
    try {
      const userId = req.userId; // Extracted from JWT
      const productId = req.query.productId; // Product ID from query
      const rating = Number(req.query.rating); // Rating from query as a number

      // Validation: Check if any required parameters are missing or invalid
      if (!userId || !productId || isNaN(rating)) {
        return res.status(400).send({ msg: "Invalid request parameters" });
      }

      // Call the repo function and get the result of the update operation
      const result = await this.productRepo.rate(productId, userId, rating);

      // If a product was updated (modifiedCount > 0), return success
      if (result.modifiedCount > 0) {
        return res
          .status(200)
          .send({ msg: "Rating updated successfully", result });
      } else {
        // If no product was found or updated, return a not-found message
        return res
          .status(404)
          .send({ msg: "Product not found or not updated" });
      }
    } catch (err) {
      // Log the error for debugging and send a generic server error message
      console.error("Error in rateProduct:", err);
      return res.status(500).send({ msg: "Internal Server Error" });
    }
  }
}
