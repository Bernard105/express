"use strict";

const express = require("express");
const hash = require("pbkdf2-password")();
const path = require("path");
const session = require("express-session");

const app = express();

//config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "shhhh, very secret",
  })
);

//Session-persisted message middleware

app.use(function (req, res, next) {
  const err = req.session.error;
  const msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = "";
  if (err) res.locals.message = '<p class="msg error">' + err + "</p>";
  if (msg) res.locals.message = '<p class="msg success">' + err + "</p>";
  next();
});

var users = {
  tj: { name: "tj" },
};

//when create new user, generate a salt
// and hash the password('foobar' is the pass here)

hash({ password: "foobar" }, function (err, pass, salt, hash) {
  if (err) throw err;
  //store the salt & hash in the "db"
  users.tj.salt = salt;
  users.tj.hash = hash;
});

//Authenticate database of doom!

function authenticate(name, pass, fn) {
  if (!module.parent) console.log("autheticating %s:%s", name, pass);
  var user = users[name];
  if (!user) return fn(null, null);
  //hash against the pass salt, if there is a match we found the user
  hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
    if (err) return fn(err);
    if (hash === user.hash) return fn(null, user);
    fn(null, null);
  });
}

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = "Access denied!";
    res.redirect("/login");
  }
}

app.get("/", function (req, res) {
  res.redirect("/login");
});

app.get("/restricted", restrict, function (req, res) {
  res.send('Click to <a href="/logout">logout</a>');
});

app.get("/logout", function (req, res) {
  req.session.destroy(function () {
    res.redirect("/");
  });
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.post("/login", function (req, res, next) {
  authenticate(req.body.username, req.body.password, function (err, user) {
    if (err) return next(err);
    if (user) {
      //Regenerate session when signing in to prevent fixation
      req.session.regenerate(function () {
        //story the user's primary key in session story or in the entire user object
        req.session.user = user;
        req.session.success =
          "Authenticated as" +
          user.name +
          ' click to <a href="/logout">logout</a>.' +
          ' access <a href="/restricted">/restricted</a>.';
        res.redirect("back");
      });
    } else {
      req.session.error =
        "Authentication failed, please check your " +
        " username and password." +
        ' (use "tj" and "foobar")';
      res.redirect("/login");
    }
  });
});

if (!module.parent) {
  app.listen(3000);
  console.log("Express started on port 3000");
}
