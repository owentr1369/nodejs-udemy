const path = require("path");
const express = require("express");
const hbs = require("hbs");
const products = require("../utils/products");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Products",
    name: "Owen Tran",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Owen Tran",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Owen Tran",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "It is snowing",
    location: "Philadelphia",
  });
});
app.get("/products", (req, res) => {
  // if (!req.query.search) {
  //   return res.send({
  //     error: "You must provide a search term",
  //   });
  // }
  products.get((error, data) => {
    if (error) {
      return res.send({ error });
    }
    if (!req.query.search) {
      return { products: data };
    }
    const filteredData = data.filter((product) => {
      return product.name
        .toLowerCase()
        .includes(req.query.search.toLowerCase());
    });
    res.send({
      products: filteredData,
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Owen Tran",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Owen Tran",
    errorMessage: "Page not found.",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
