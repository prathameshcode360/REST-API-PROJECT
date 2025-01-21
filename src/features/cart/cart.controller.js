import CartModel from "./cart.model.js";
export default class CartController {
  addItem(req, res) {
    try {
      const productId = Number(req.query.productId);
      const quantity = Number(req.query.quantity);
      const userId = req.userId;
      const newCartItem = CartModel.add(userId, productId, quantity);
      return res
        .status(201)
        .send({ msg: "product added in cart", cartItem: newCartItem });
    } catch (err) {
      console.error("Error:", err);
    }
  }
  getCartItems(req, res) {
    try {
      const userId = req.userId;
      let items = CartModel.getAll(userId);
      return res.status(200).send({ msg: "Your cart", Items: items });
    } catch (err) {
      console.error("Error:", err);
    }
  }
  deleteItem(req, res) {
    const userId = req.userId;
    const itemId = req.params.itemId;
    const result = CartModel.delete(itemId, userId);
    return res.send(result);
  }
}
