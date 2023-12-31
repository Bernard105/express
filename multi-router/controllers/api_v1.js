"use strict";

const express = require("express");

const apiv1 = express.Router();

apiv1.get("/", function (req, res) {
  res.send("Hello from APIv1 root route.");
});

apiv1.get("/user", function (req, res) {
  res.send("List of APIv1 user.");
});

module.exports = apiv1;
