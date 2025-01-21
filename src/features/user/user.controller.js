import UserModel from "./user.model.js";

export default class UserController {
  signUp(req, res) {
    try {
      const { name, email, password } = req.body;
      const newUser = UserModel.register(name, email, password);
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
        return res.status(200).send({ msg: "Login Successfully", user: user });
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
