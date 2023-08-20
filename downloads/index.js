"use strict";
const express = require("express");
const path = require("path");

const app = express();

const FILES = path.join(__dirname, "files");

app.get("/", function (req, res) {
  res.send(
    "<ul>" +
      '<li>Download <a href="/files/notes/vegata.txt">notes/vegeta.txt</a>.</li>' +
      '<li>Download <a href="/files/songoku.txt">songoku.txt</a>.</li>' +
      '<li>Download <a href="/files/songohan.txt">songohan.txt</a>.</li>' +
      '<li>Download <a href="/files/songoten.txt">songoten.txt</a>.</li>' +
      "</ul>"
  );
});

app.get("/files/:file(*)", function (req, res, next) {
  res.download(req.params.file, { root: FILES }, function (err) {
    if (!err) return;
    if (err.status !== 404) return next(err);
    res.statusCode = 404;
    res.send("Cant find that file, sorry!");
  });
});

app.listen(3002, () => {
  console.log("Express started on port 3002");
});
