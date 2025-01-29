import CartRepo from "./cart.repo.js";
export default class CartController {
  constructor() {
    this.cartRepo = new CartRepo();
  }
  async addItem(req, res) {
    try {
      const productId = req.query.productId;
      const quantity = Number(req.query.quantity);
      const userId = req.userId;
      const newCartItem = await this.cartRepo.add(productId, userId, quantity);
      return res
        .status(201)
        .send({ msg: "product added in cart", cartItem: newCartItem });
    } catch (err) {
      console.error("Error:", err);
    }
  }
  async getCartItems(req, res) {
    try {
      const userId = req.userId;
      let items = await this.cartRepo.getAll(userId);
      return res.status(200).send({ msg: "Your cart", Items: items });
    } catch (err) {
      console.error("Error:", err);
    }
  }
  async deleteItem(req, res) {
    try {
      const itemId = req.params.itemId;
      const result = await this.cartRepo.delete(itemId);

      if (!result) {
        return res.status(404).send("Item not found");
      }

      return res.status(200).send({ msge: "Deleted successfully", result });
    } catch (err) {
      console.log("Error:", err);
      return res.status(500).send("Server error");
    }
  }
}
