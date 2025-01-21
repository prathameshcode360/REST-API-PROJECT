import ProductModel from "./product.model.js";

export default class ProductController {
  getAllProducts(req, res) {
    try {
      let products = ProductModel.getAll();
      return res.status(200).send(products);
    } catch (err) {
      console.error("Error:", err);
    }
  }
  addProduct(req, res) {
    try {
      const { name, price } = req.body;
      const image = req.file.filename;
      const newProduct = ProductModel.add(name, price, image);
      return res.status(201).send({
        msg: "Product added successfully",
        product: newProduct,
      });
    } catch (err) {
      console.error("Error:", err);
    }
  }
  getOneProduct(req, res) {
    try {
      const id = req.params.id;
      const product = ProductModel.get(id);
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
  filterProducts(req, res) {
    try {
      const minPrice = req.query.minPrice;
      const maxPrice = req.query.maxPrice;

      let result = ProductModel.filter(minPrice, maxPrice);
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
  rateProduct(req, res) {
    try {
      const userId = req.query.userId;
      const productId = req.query.productId;
      const rating = Number(req.query.rating);
      const result = ProductModel.rate(userId, productId, rating);
      if (result) {
        return res.send(result);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }
}
