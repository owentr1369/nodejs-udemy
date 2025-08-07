const express = require("express");
const path = require("path");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const {
  generateMessage,
  generateLocationMessage,
} = require("./utils/messages");

const server = http.createServer(app);
const io = new Server(server);

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  socket.emit("message", generateMessage("Welcome to the chat"));
  socket.broadcast.emit(
    "message",
    generateMessage("A new user has joined the chat")
  );

  socket.on("join", ({ username, room }, callback) => {
    if (!username || !room) {
      return callback("Username and room are required");
    }

    socket.join(room);
    socket.emit(
      "message",
      generateMessage("You are now connected to the chat")
    );
    socket.broadcast
      .to(room)
      .emit("message", generateMessage(`${username} has joined the chat`));
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    io.emit("message", generateMessage(message));
    callback();
  });
  socket.on("locationMessage", (position, callback) => {
    io.emit("locationMessage", generateLocationMessage(position));
    callback();
  });
  socket.on("disconnect", () => {
    // const username = socket.username;
    // const room = socket.room;
    // if (username && room) {
    //   io.to(room).emit(
    //     "message",
    //     generateMessage(`${username} has left the chat`)
    //   );
    // }
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
