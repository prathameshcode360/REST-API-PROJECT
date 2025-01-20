export default class ProductModel {
  constructor(id, name, price, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
  }
  static getAll() {
    return products;
  }
  static add(name, price, image) {
    const newProduct = new ProductModel(
      products.length + 1,
      name,
      price,
      image
    );
    products.push(newProduct);
    return newProduct;
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
