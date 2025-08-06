const socket = io();
socket.on("countUpdated", (count) => {
  console.log(count);
});

document.getElementById("increment").addEventListener("click", () => {
  socket.emit("increment");
});
