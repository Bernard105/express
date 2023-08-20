const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/", (req, res) => {
  res.send("GET request to homepage");
});

app.post("/", (req, res) => {
  res.send("POST request to homepage");
});

app.all("/secret", (req, res, next) => {
  console.log("Accessing the secret section ...");
  next();
});

app.get("/", (req, res) => {
  res.send("root");
});

app.get("/about", (req, res) => {
  res.send("about");
});

app.get("/random/text", (req, res) => {
  res.send("random.txt");
});

app.get("/ab?cd", (req, res) => {
  res.send("ab?cd");
});

app.get("/ab+cd", (req, res) => {
  res.send("ab+cd");
});

app.get("/ab*cd", (req, res) => {
  res.send("ab*cd");
});

app.get("/ab(cd_?e", (req, res) => {
  res.send("ab(cd)?e");
});

app.get(/a/, (req, res) => {
  res.send("/a/");
});

app.get(/.*fly$/, (req, res) => {
  res.send("/.*fly$/");
});

//A single callback function can handle a route.

app.get("/users/:userId/books/:bookId", (req, res) => {
  res.send(req.params);
});

//More than one callback function can handle a route

app.get(
  "/example/b",
  (req, res, next) => {
    console.log("the res will be send by the next function ...");
    next();
  },
  (req, res) => {
    res.send("Hello from B!");
  }
);

//An array of callback functions can handle a route.

const cb0 = function (req, res, next) {
  console.log("CB0");
  next();
};

const cb1 = function (req, res, next) {
  console.log("CB1");
  next();
};

const cb2 = function (req, res) {
  res.send("Hello from C!");
};

app.get("/example/c", [cb0, cb1, cb2]);

//A combination of independent functions and arrays of functions can handle a route

const cB0 = function (req, res, next) {
  console.log("CB0");
  next();
};

const cB1 = function (req, res, next) {
  console.log("CB1");
  next();
};

app.get(
  "/example/d",
  [cb0, cb1],
  (req, res, next) => {
    console.log("the res will be sent by the next function ...");
    next();
  },
  (req, res) => {
    res.send("Hello from D!");
  }
);

//app.route()

app
  .route("/book")
  .get((req, res) => {
    res.send("Add a book");
  })
  .post((req, res) => {
    res.send("Add a book");
  })
  .put((req, res) => {
    res.send("Update the book");
  });

// express.Router

const express = require("express");
const router = express.Router();

// middleware
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

//define the home page route
router.get("/", (req, res) => {
  res.send("Birds home page");
});

//define the about route
router.get("/about", (req, res) => {
  res.send("About birds");
});

module.exports = router;
