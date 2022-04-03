const express = require("express");
require("./db/mongoose");

const userRouter = require("./router/user");
const taskRouter = require("./router/tasks");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
// app.get("/", (req, res) => {
//     res.send("Fenil");
//     });
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
