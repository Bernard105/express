"use strict";

const cookieSession = require("cookie-session");
const express = require("express");

const app = express();

app.use(cookieSession({ secret: "manny is cool" }));

app.use(count);

function count(req, res) {
  req.session.count = (req.session.count || 0) + 1;
  res.send("viewed" + req.session.count + "times\n");
}

// app.use((req, res, next) => {
//   req.session.count = (req.session.count || 0) + 1;
//   next();
// });

// app.get("/count", async (req, res) => {
//   try {
//     const newCount = await req.session.count;
//     res.status(200).json({ message: `viewed ${newCount}` });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: err });
//   }
// });

app.listen(3001, () => {
  console.log("Express started on port 3000");
});
