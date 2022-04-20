const express = require("express");
require("./db/mongoose");

const userRouter = require("./router/user");
const taskRouter = require("./router/tasks");
const workspaceRouter = require("./router/workspace");
const featuresRouter = require("./router/features");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(workspaceRouter);
app.use(featuresRouter);
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
