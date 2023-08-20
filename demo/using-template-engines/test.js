//npm install pug --save
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", { title: "Hey", message: "Hello world" });
});
//make a request to the home page, the file will be rendered as HTML.index.pug

//template engine for rendering files..ntl

const fs = require("fs");
app.engine("ntl", (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);
    const rendered = content
      .toString()
      .replace("#title#", `<title>${options.title}</title>`)
      .replace("#message#", `<h1>${options.message}</h1>`);
    return callback(null, rendered);
  });
});

app.set("views", "./views");
app.set("view engine", "ntl");

app.get("/", (req, res) => {
  res.render("index", { title: "Hey", message: "Hello there!" });
});
