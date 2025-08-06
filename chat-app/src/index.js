const express = require("express");
const path = require("path");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server);

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", () => {
  console.log("New web socket connection");
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
