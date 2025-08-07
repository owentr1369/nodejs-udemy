const socket = io();
socket.on("welcomeMessage", (message) => {
  console.log(message);
});

document.querySelector("#chat-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const message = e.target.message.value;
  socket.emit("sendMessage", message);
});
