const express = require("express");
const cookieParser = require("cookie-parser");
const cookieValidator = require("./cookieValidator");
const app = express();

app.get("/", (req, res) => {
  console.log("Hello world");
});

const myLogger = function (req, res, next) {
  console.log("LOGGED");
  next();
};

app.use(myLogger);

const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

app.get("/a", (req, res) => {
  let responseText = "Hello World!<br>";
  responseText += `<small>Requested at: ${req.requestTime}</small>`;
  res.send(responseText);
});

async function cookieValidator(cookies) {
  try {
    await externallyValidateCookie(cookies.testCookie);
  } catch {
    throw new Error("Invalid cookie");
  }
}

async function validateCookies(req, res, next) {
  await cookieValidator(req.cookies);
  next();
}

app.use(cookieParser());

app.use(validateCookies);

app.use((err, req, res, next) => {
  res.status(400).send(err.message);
});
app.listen(3000);
