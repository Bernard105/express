"use strict";

const express = require("express");
const path = require("path");

const app = express();

app.engine("html", require("ejs").renderFile);

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "html");

const users = [
  { name: "naruto", email: "naruto@gmail.com" },
  { name: "minato", email: "minato@gmail.com" },
  { name: "kurama", email: "kurama@gmail.com" },
];

app.get("/", function (req, res) {
  res.render("users", {
    users: users,
    title: "EJS example",
    header: "Some users",
  });
});

app.listen(3005, () => {
  console.log("Server started at 3005");
});
