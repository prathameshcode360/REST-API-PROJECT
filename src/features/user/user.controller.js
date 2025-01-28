import jwt from "jsonwebtoken";
import UserRepository from "./user.repo.js";
import bcrypt from "bcrypt";
export default class UserController {
  constructor() {
    this.userRepo = new UserRepository();
  }
  async signUp(req, res) {
    try {
      const { name, email, password } = req.body;
      const hashPassword = await bcrypt.hash(password, 12);
      const newUser = await this.userRepo.register(name, email, hashPassword);
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

      const user = await this.userRepo.login(email);
      if (!user) {
        return res.status(404).send({ msg: "user not found" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(404).send("Invalid credentials");
      }

      const token = jwt.sign(
        { userId: user.id, userEmail: user.email },
        "WgANnhixxHPT5dwHBjtIETIEGWDuGD5B",
        { expiresIn: "1h" }
      );
      return res.status(200).send(token);
    } catch (err) {
      console.error("Error:", err);
    }
  }

  async getUsers(req, res) {
    try {
      let users = await this.userRepo.getAll();
      return res.status(200).send(users);
    } catch (err) {
      console.error("Error:", err);
    }
  }
}
