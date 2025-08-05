const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const User = require("./models/user");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

const main = async () => {
  const user = await User.findById("6890cc02f3dce2fb9b6f59fa");
  await user.populate("tasks");
  console.log(user.tasks);
};

main();
