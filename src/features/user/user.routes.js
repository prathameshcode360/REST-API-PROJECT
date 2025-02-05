import express from "express";
import UserController from "./user.controller.js";

const userController = new UserController();

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  userController.getUsers(req, res);
});
userRouter.post("/signup", (req, res) => {
  userController.signUp(req, res);
});
userRouter.post("/signin", (req, res) => {
  userController.signIn(req, res);
});

export default userRouter;
