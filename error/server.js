"use strict";

const express = require("express");
const logger = require("morgan");

const app = express();
const test = app.get("env") === "test";

if (!test) app.use(logger("dev"));

function error(err, req, res, next) {
  if (!test) console.error(err.stack);
}

app.get("/", function () {
  process.nextTick(function () {
    next(new Error("oh no!"));
  });
});

app.use(error);

app.listen(3007, () => {
  console.log("Server start on 3007");
});
