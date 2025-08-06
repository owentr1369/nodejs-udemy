const express = require("express");
const path = require("path");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server);

const publicDirectoryPath = path.join(__dirname, "../public");

let count = 0;

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  socket.emit("countUpdated", count);
  socket.on("increment", () => {
    count++;
    socket.emit("countUpdated", count);
    console.log("count", count);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
