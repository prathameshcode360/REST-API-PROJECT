import express from "express";
import UserController from "./user.controller.js";

const userController = new UserController();

const userRouter = express.Router();

userRouter.get("/", userController.getUsers);
userRouter.post("/signup", (req, res) => {
  userController.signUp(req, res);
});
userRouter.post("/signin", userController.signIn);

export default userRouter;
