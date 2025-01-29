export default class ProductModel {
  constructor(name, price, image, category, _id) {
    this._id = _id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.category = category;
  }
}
