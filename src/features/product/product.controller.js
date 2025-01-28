import ProductRepo from "./product.repository.js";

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
      console.error("Error:", err);
    }
  }
  async getOneProduct(req, res) {
    try {
      const _id = req.params._id;
      const product = await this.productRepo.getOne(_id);
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
      const userId = req.userId;
      const productId = req.query.productId;
      const rating = Number(req.query.rating);
      const result = await this.productRepo.rate(userId, productId, rating);
      if (result) {
        return res.send(result);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }
}
