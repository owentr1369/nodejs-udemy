const express = require("express");
const path = require("path");

const app = express();

// Describe path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates");

// Setup handlebars engine and view locations
app.set("view engine", "hbs");
app.set("views", viewsPath);

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
  res.render("help");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/weather", (req, res) => {
  res.render("weather");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
