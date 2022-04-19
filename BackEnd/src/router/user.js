const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
const multer = require("multer");
const sharp = require("sharp");
const Workspace = require("../models/workspace");
const Task = require("../models/tasks");

router.post("/users", async (req, res) => {
  // console.log(req);

  try {
    const workspace = await Workspace.find({}).sort();
    // console.log("Works==", workspace);
    let temp_workSpace = {};
    if (workspace.length !== 0) {
      const min_work = parseInt(workspace[0].register_no);
      const max_work = parseInt(workspace[workspace.length - 1].register_no);
      const random_workspace_id = Math.floor(
        Math.random() * (max_work - min_work) + min_work
      );
      const workspace_data = await Workspace.find({
        register_no: random_workspace_id,
      });
      temp_workSpace = { workspace_id: workspace_data[0]._id };
    }
    const user = new User({ ...req.body, ...temp_workSpace });
    await user.save();
    const token = await user.generateAuthToken();
    const msg = "REGISTRED SUCESSFULLY";
    //res.status(201).send(msg);
    res.status(201).send({ msg, user, token });
  } catch (e) {
    res.status(400).send("Email Alreday Exists");
    console.log(e);
  }
});

router.post("/users/login", async (req, res) => {
  // console.log("reqqq=", req.body);
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send({ message: "You are logged out" });
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/user/me/:id", auth, async (req, res) => {
  const id = req.params.id;

  //console.log("ID===", id);

  let updatedUser = {};

  // console.log("Name==", req.body);
  User.findByIdAndUpdate(id, req.body, function (err, docs) {
    if (err) {
      console.log(err);
      // res.status(400).send({ error: "something wrong" });
    } else {
      updatedUser = docs;
      // req.send({ users: docs });
      User.findById(id, function (err, docs) {
        if (docs) {
          console.log("Updated User : ", docs);
          res.status(200).send({ user: docs });
        } else {
          res.status(400).send({ error: "something wrong" });
        }
      });
    }
  });
});

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
      return cb(new Error("File Must Be A PNG ,JPG ,"));
    }
    cb(undefined, true);
    // cb(undefined,false) callback
  },
});
router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  }
);

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

router.get("/getuserbyworkspace/:id", auth, async (req, res) => {
  const _id = req.params.id;
  // console.log("IIDD==", _id);

  try {
    const workspace = await Workspace.findById(_id);
    // console.log("WORKSPACE===", workspace);
    if (!workspace) {
      return res.status(404).send();
    }
    const users = await User.find({ workspace_id: _id });
    const response = { ...workspace._doc, users };
    // console.log("USER==", users);
    // console.log("RESSS==", response);
    res.send({ workspace: workspace, users });
  } catch (e) {
    // console.log("Error===", e);
    res.status(500).send();
  }
});

router.get("/getuserbyid/:id", auth, async (req, res) => {
  const _id = req.params.id;
  // console.log("IIDD==", _id);

  try {
    const user = await User.findById(_id);
    // console.log("User===", user.name);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    console.log("Error===", e);
    res.status(500).send();
  }
});
module.exports = router;
