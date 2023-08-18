"use strict";
const express = require("express");
const app = (module.exports = express());
const users = require("./db");

//deal different types of formatting

app.get("/", function (req, res) {
  res.format({
    html: function () {
      res.send(
        "<ul>" +
          users
            .map(function (user) {
              return "<li>" + user.name + "</li>";
            })
            .join("") +
          "</ul>"
      );
    },

    text: function () {
      res.send(
        users
          .map(function (user) {
            return " - " + user.name + "\n";
          })
          .join("")
      );
    },

    json: function () {
      res.json(users);
    },
  });
});

//middleware like declarative

function format(path) {
  const obj = require(path);
  return function (req, res) {
    res.format(obj);
  };
}

app.get("/users", format("./users"));

app.listen(3000, () => {
  console.log("Express started on port 3000");
});
