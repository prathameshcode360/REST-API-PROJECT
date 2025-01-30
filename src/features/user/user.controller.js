import jwt from "jsonwebtoken";
import UserRepo from "./user.repo.js";
import bcrypt from "bcrypt";
export default class UserController {
  constructor() {
    this.userRepo = new UserRepo();
  }
  async signUp(req, res) {
    try {
      const { name, email, password } = req.body;

      // Improved password regex (at least 8 chars, 1 uppercase, 1 lowercase, 1 number)
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          msg: "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, and one number.",
        });
      }

      const hashPassword = await bcrypt.hash(password, 12);

      const newUser = await this.userRepo.register({
        name,
        email,
        password: hashPassword,
      });

      return res.status(201).json({ msg: "User added successfully", newUser });
    } catch (err) {
      console.error("Error:", err.message);
      return res.status(400).json({ error: err.message });
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
        { userId: user._id, userEmail: user.email },
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
  async resetPassword(req, res, next) {
    const { newPassword } = req.body;
    const userId = req.userId;
    const hashPassword = await bcrypt.hash(newPassword, 12);
    try {
      await this.userRepo.reset(userId, hashPassword);
      return res
        .status(200)
        .send({ msg: "successfully reseted your password" });
    } catch (err) {
      throw err;
    }
  }
}
