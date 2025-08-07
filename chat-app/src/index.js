const express = require("express");
const path = require("path");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server);

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  socket.emit("message", "Welcome to the chat");
  socket.broadcast.emit("message", "A new user has joined the chat");
  socket.on("sendMessage", (message, callback) => {
    io.emit("message", message);
    callback();
  });
  socket.on("sendLocation", (position, callback) => {
    io.emit(
      "message",
      `https://google.com/maps?q=${position.latitude},${position.longitude}`
    );
    callback();
  });
  socket.on("disconnect", () => {
    io.emit("message", "A user has left the chat");
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
