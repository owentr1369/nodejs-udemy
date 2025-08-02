const express = require("express");
const path = require("path");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.get("/help", (req, res) => {
  res.send({
    name: "Owen",
    age: 26,
  });
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.get("/weather", (req, res) => {
  res.send("Weather page");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
