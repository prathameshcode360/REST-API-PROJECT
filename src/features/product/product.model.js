import UserModel from "../user/user.model.js";
export default class ProductModel {
  constructor(name, price, image, category, _id) {
    this._id = _id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.category = category;
  }

  static rate(userId, productId, rating) {
    // Checking if the user exists
    const user = UserModel.getAll().find((u) => u.id == userId);
    if (!user) {
      return "User not found";
    }

    // Checking if the product exists
    const product = products.find((p) => p.id == productId);
    if (!product) {
      return "Product not found";
    }

    // Initialize ratings array if not present
    if (!product.ratings) {
      product.ratings = [];
    }

    // Check if the user has already rated the product
    const existingRatingIndex = product.ratings.findIndex(
      (r) => r.userId == userId
    );

    if (existingRatingIndex >= 0) {
      // Update the existing rating
      product.ratings[existingRatingIndex].rating = rating;
      return "Rating updated successfully.";
    } else {
      // Add a new rating
      product.ratings.push({ userId: userId, rating: rating });
      return "Rating added successfully.";
    }
  }
}
let products = [];
