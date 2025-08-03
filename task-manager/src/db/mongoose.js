const mongoose = require("mongoose");
const { type } = require("os");

const connectionURL = "mongodb://127.0.0.1:27017/task-manager-api";

mongoose.connect(connectionURL);

const User = mongoose.model("User", {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

const currentUser = new User({
  name: "Owen 1",
  age: "Jack",
});

currentUser
  .save()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
