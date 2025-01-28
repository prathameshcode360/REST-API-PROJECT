import UserModel from "../user/user.model.js";
export default class ProductModel {
  constructor(name, price, image, _id) {
    this._id = _id;
    this.name = name;
    this.price = price;
    this.image = image;
  }

  static get(id) {
    const product = products.find((p) => p.id == id);
    return product;
  }
  static filter(minPrice, maxPrice) {
    return products.filter((p) => {
      return (
        (minPrice === undefined || p.price >= minPrice) &&
        (maxPrice === undefined || p.price <= maxPrice)
      );
    });
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
var products = [
  new ProductModel(
    1,
    "Product 1",
    200,
    "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg"
  ),
  new ProductModel(
    2,
    "Product 2",
    100,
    "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg"
  ),
  new ProductModel(
    3,
    "Product 3",
    250,
    "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg"
  ),
];
