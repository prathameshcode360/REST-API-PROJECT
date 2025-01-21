import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
export default class UserController {
  async signUp(req, res) {
    try {
      const { name, email, password } = req.body;
      const newUser = await UserModel.register(name, email, password);
      return res
        .status(201)
        .send({ msg: "user added successfully", newUser: newUser });
    } catch (err) {
      console.error("Error", err);
    }
  }
  signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = UserModel.login(email, password);
      if (!user) {
        return res.status(404).send({ msg: "user not found" });
      } else {
        const token = jwt.sign(
          { userId: user.id, userEmail: user.email },
          "WgANnhixxHPT5dwHBjtIETIEGWDuGD5B",
          { expiresIn: "1h" }
        );

        return res.status(200).send(token);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }
  getUsers(req, res) {
    try {
      let users = UserModel.getAll();
      return res.status(200).send(users);
    } catch (err) {
      console.error("Error:", err);
    }
  }
}
