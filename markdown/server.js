"use strict";

const escapeHtml = require("escape-html");
const express = require("express");
const fs = require("fs");
const marked = require("marked");
const path = require("path");

const app = express();

app.engine("md", function (path, options, fn) {
  fs.readFile(path, "utf8", function (err, str) {
    if (err) return fn(err);
    const html = marked.parse(str).replace(/\{([^}]+)\}/g, function (_, name) {
      return escapeHtml(options[name] || "");
    });
    fn(null, html);
  });
});

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "md");

app.get("/", function (req, res) {
  res.render("index", { title: "Markdown Example" });
});

app.get("/fail", function (req, res) {
  res.render("missing", { title: "Markdown Example" });
});

app.listen(3008, () => {
  console.log("Server start on port 3008");
});
