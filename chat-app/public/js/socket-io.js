const socket = io();

const $messageForm = document.getElementById("chat-form");
const $messageInput = document.getElementById("message");
const $sendMessageButton = document.getElementById("send");
const $messages = document.querySelector("#messages");
const $sendLocationButton = document.getElementById("send-location");

const messageTemplate = document.getElementById("message-template").innerHTML;
const locationMessageTemplate = document.getElementById(
  "location-message-template"
).innerHTML;

socket.on("message", (message) => {
  const html = Mustache.render(messageTemplate, {
    message: message,
    createdAt: moment(message.createdAt).format("h:mm a"),
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

socket.on("locationMessage", (url) => {
  const html = Mustache.render(locationMessageTemplate, {
    url: url,
    createdAt: moment().format("h:mm a"),
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  $sendMessageButton.setAttribute("disabled", "disabled");
  const message = e.target.message.value;
  socket.emit("sendMessage", message, (error) => {
    $sendMessageButton.removeAttribute("disabled");
    $messageInput.value = "";
    $messageInput.focus();
    console.log("Message delivered", message);
  });
});

$sendLocationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser");
  }
  navigator.geolocation.getCurrentPosition((position, error) => {
    socket.emit(
      "locationMessage",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        console.log("Location shared");
      }
    );
  });
});
