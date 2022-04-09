const express = require("express");
const router = new express.Router();
const Workspace = require("../models/workspace");
const auth = require("../middleware/auth");
const User = require("../models/user");
router.post("/addworkspace", auth, async (req, res) => {
  const workspaces = new Workspace(req.body);
  try {
    console.log("Reqq==", req.body);
    await workspaces.save();

    res.status(201).send(workspaces);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/getworkspaces", auth, async (req, res) => {
  try {
    const workspaces = await Workspace.find({});
    res.send(workspaces);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/workspace/:id", auth, async (req, res) => {
  try {
    const workspaces = await Workspace.findByIdAndDelete(req.params.id);

    if (!workspaces) {
      return res.status(404).send();
    }
    res.send(workspaces);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
