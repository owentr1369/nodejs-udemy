const request = require("request");

const url = "https://api.restful-api.dev/objects";

request({ url, json: true }, (error, response) => {
  const data = response.body;
  const iPad = data.find((item) => item.id === "12");
  console.log("iPad", iPad);
  console.log(`The ${iPad.name} is currently $${iPad.data.Price}`);
});
