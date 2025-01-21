import UserModel from "../features/user/user.model.js";
export default function basicAuth(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(404).send("Unauthorized User");
    }
    const base64Credetials = authHeader.replace("Basic", "").trim();

    const decodeCredentials = Buffer.from(base64Credetials, "base64").toString(
      "utf-8"
    );

    const creds = decodeCredentials.split(":");
    const user = UserModel.getAll().find(
      (u) => u.email == creds[0] && u.password == creds[1]
    );
    if (user) {
      next();
    } else {
      return res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.error("Error:", err);
  }
}
