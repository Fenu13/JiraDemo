const express = require("express");
const router = new express.Router();
const Task = require("../models/tasks");
const auth = require("../middleware/auth");

router.post("/newtasks", auth, async (req, res) => {
  const tasks = new Task(req.body);

  try {
    await tasks.save();
    res.status(201).send(tasks);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/getSelectTask/:status", async (req, res) => {
  const _id = req.params.status;
  try {
    const tasks = await Task.find({ status: _id });

    if (!tasks) {
      return res.status(404).send();
    }
    res.send(tasks);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/updateTask/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowUpdates = ["status"];
  const isValidOperation = updates.every((update) =>
    allowUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates !" });
  }
  try {
    const tasks = await Task.findById(req.params.id);
    updates.forEach((update) => (tasks[update] = req.body[update]));
    await tasks.save();
    if (!tasks) {
      return res.status(404).send();
    }
    res.send(tasks);
  } catch (e) {
    res.status(400).send(e);
  }
});
module.exports = router;