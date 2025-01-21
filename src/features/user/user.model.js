export default class UserModel {
  constructor(name, email, password, _id) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
