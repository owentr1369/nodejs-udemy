const express = require("express");
const path = require("path");
const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
