import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Express Server");
});

app.listen(4000, () => {
  console.log("server is running on port 4000");
});
