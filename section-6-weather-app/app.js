const request = require("request");

const url = "https://api.restful-api.dev/objects";

request({ url }, (error, response) => {
  const data = JSON.parse(response.body);
  console.log(data);
});
