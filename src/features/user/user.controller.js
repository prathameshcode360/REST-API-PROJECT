import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepo from "./user.repository.js";
export default class UserController {
  constructor() {
    this.userRepo = new UserRepo();
  }
  async signUp(req, res) {
    try {
      const { name, email, password } = req.body;
      const newUser = new UserModel(name, email, password);
      await this.userRepo.register(newUser);
      return res
        .status(201)
        .send({ msg: "user added successfully", newUser: newUser });
    } catch (err) {
      console.error("Error", err);
    }
  }
  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await this.userRepo.login(email, password);
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
  async getUsers(req, res) {
    try {
      let users = await this.userRepo.get();
      return res.status(200).send(users);
    } catch (err) {
      console.error("Error:", err);
    }
  }
}
