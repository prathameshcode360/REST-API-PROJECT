import jwt from "jsonwebtoken";

export default function jswtAuth(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).send("unauthorized user");
  }
  try {
    const payload = jwt.verify(token, "WgANnhixxHPT5dwHBjtIETIEGWDuGD5B");
    req.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).send("unauthorized user");
  }
}
