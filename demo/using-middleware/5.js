//Third-party middleware

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

// load the cookie-parsing middleware
app.use(cookieParser());
