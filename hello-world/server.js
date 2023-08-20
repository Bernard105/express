"use strict";

const express = require("express");

const app = express();

app.get("/", function (req, res) {
  res.send("Hello world");
});

app.listen(3008, () => {
  console.log("Server started on port 3008");
});
