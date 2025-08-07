const socket = io();

const $messageForm = document.getElementById("chat-form");
const $messageInput = document.getElementById("message");
const $sendMessageButton = document.getElementById("send");
// const $messages = document.querySelector("#messages");
const $sendLocationButton = document.getElementById("send-location");

$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  $sendMessageButton.setAttribute("disabled", "disabled");
  const message = e.target.message.value;
  socket.emit("sendMessage", message, (error) => {
    $sendMessageButton.removeAttribute("disabled");
    $messageInput.value = "";
    $messageInput.focus();
    console.log("Message delivered");
  });
});

$sendLocationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser");
  }
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit("sendLocation", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  });
});
