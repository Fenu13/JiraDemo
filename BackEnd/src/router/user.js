const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
const multer = require("multer");
const sharp = require("sharp");

router.post("/users", async (req, res) => {
  console.log(req);
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send("Email Alreday Exists");
    console.log(e);
  }
});

router.post("/users/login", async (req, res) => {
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

// router.patch("/user/me/:id", auth, async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowUpdates = ["name", "email"];
//   const isValidOperation = updates.every((update) =>
//     allowUpdates.includes(update)
//   );

//   if (!isValidOperation) {
//     return res.status(400).send({ error: "Invalid Updates !" });
//   }

//   try {
//     const user = await User.findById(req.params.id);
//     console.log("USER==", user);
//     updates.forEach((update) => (user[update] = req.body[update]));
//     await user.save();
//     if (!user) {
//       return res.status(404).send();
//     }
//     res.send(user);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

router.patch("/user/me/:id", auth, async (req, res) => {
  const id = req.params.id;

  console.log("ID===", id);

  let updatedUser = {};

  console.log("Name==", req.body);
  User.findByIdAndUpdate(id, req.body, function (err, docs) {
    if (err) {
      console.log(err);
      // res.status(400).send({ error: "something wrong" });
    } else {
      updatedUser = docs;
      // req.send({ users: docs });
      // res.status(200).send({ users: docs });
    }
  });
  User.findById(id, function (err, docs) {
    if (docs) {
      console.log("Updated User : ", docs);
      res.status(200).send({ users: docs });
    } else {
      res.status(400).send({ error: "something wrong" });
    }
  });
  // if (updatedUser !== {}) {
  //   res.status(200).send({ users: updatedUser });
  // }
  // User.findByIdAndUpdate(id, req.body, function (err, updatedData) {
  //   if (err) {
  //     console.log(err);
  //     res.send("Error updating");
  //   } else {
  //     console.log(updatedData);
  //     res.json(updatedData);

  //     //res.redirect or res.send whatever you want to do
  //   }
  // });
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

module.exports = router;
