const express = require("express");
const app = express();
const router = express.Router();

router.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

router.use(
  "/user/:id",
  (req, res, next) => {
    console.log("Request URL:", req.originUrl);
    next();
  },
  (req, res, next) => {
    console.log("Request Type:", req.method);
    next();
  }
);

router.get(
  "/user/:id",
  (req, res, next) => {
    if (req.params.id === "0") next("route");
    else next();
  },
  (req, res, next) => {
    res.render("regular");
  }
);

router.get("/user/:id", (req, res, next) => {
  console.log(req.params.id);
  res.render("special");
});

app.use("/", router);

router.use((req, res, next) => {
  if (!req.header["x-auth"]) return next("router");
  next();
});

router.get("/user/:id", (req, res) => {
  res.send("hello,user!");
});

app.use("/admin", router, (req, res) => {
  res.sendStatus(401);
});
