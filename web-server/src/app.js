const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

// Describe path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and view locations
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Setup routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Owen Tran",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Heading for Help page",
  });
});

app.get("/help/*", (req, res) => {
  res.send("Help article not found");
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Heading for About page",
  });
});

app.get("/weather", (req, res) => {
  res.render("weather", {
    title: "Heading for Weather page",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Owen Tran",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
