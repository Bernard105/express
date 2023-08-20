const express = require("express");

const app = express();

app.get(
  "/user/:id",
  (req, res, next) => {
    console.log("ID:", req.params.id);
    next();
  },
  (req, res, next) => {
    res.send("User Info");
  }
);

app.get("/user/:id", (req, res, next) => {
  res.send(req.params.id);
});

app.listen(3004, () => {
  console.log("Server started at 3004");
});
