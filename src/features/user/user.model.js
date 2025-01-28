import { getDB } from "../../config/mongodb.js";
export default class UserModel {
  constructor(name, email, password, _id) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static login(email, password) {
    const user = users.find((u) => u.email == email && u.password == password);
    return user;
  }
  static getAll() {
    return users;
  }
}

let users = [new UserModel(1, "user", "user@gmail.com", "user123")];
