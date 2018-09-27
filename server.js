const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;
var app = express();
hbs.registerHelper("getFullYear", () => {
  return new Date().getFullYear();
});
hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, resp, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("Could not append to server.log");
    }
  });
  console.log(log);
  next();
});

// app.use((req, res, next) => {
//   console.log("Under Maintenance");
//   res.render("maintenance.hbs");
// });

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  //   res.send({
  //     name: "Shashank",
  //     likes: ["movies", "electronics"]
  //   });
  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMessage: "Welcome to Express and handlebar templating"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Unable to fulfill the request"
  });
});

app.get("/projects", (req, res) => {
  res.render("projects.hbs", {
    welcomeMessage: "Portfolio page"
  });
});

app.listen(port, () => {
  console.log(`server is up at port ${port}`);
});
