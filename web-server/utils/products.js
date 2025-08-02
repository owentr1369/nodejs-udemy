const request = require("request");

const url = "https://api.restful-api.dev/objects";

request({ url, json: true }, (error, response) => {
  if (error) {
    console.log("Cannot connect to the service");
  } else {
    const data = response.body;
    const iPad = data.find((item) => item.id === "12");
    console.log("iPad", iPad);
    console.log(`The ${iPad.name} is currently $${iPad.data.Price}`);
  }
});

const get = (callback) => {
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Cannot connect to the service", undefined);
    } else {
      callback(undefined, response.body);
    }
  });
};

module.exports = { get };
