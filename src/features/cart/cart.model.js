export default class CartModel {
  constructor(id, userId, productId, quantity) {
    this.userId = userId;
    this.productId = productId;
    this.quantity = quantity;
    this.id = id;
  }
  static add(userId, productId, quantity) {
    const newCartItem = new CartModel(
      cartItems.length + 1,
      userId,
      productId,
      quantity
    );
    cartItems.push(newCartItem);
    return newCartItem;
  }
  static getAll(userId) {
    return cartItems.filter((item) => item.userId == userId);
  }
}
let cartItems = [new CartModel(1, 1, 2, 2)];
