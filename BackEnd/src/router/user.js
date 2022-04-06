const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
//const nodemailer = require("nodemailer");

router.post("/users", async (req, res) => {
  console.log(req);
  const user = new User(req.body);
  //const username = new User(req.body.email);
  //    console.log('Send')
  //    console.log('user=',user)
  //     //if(user.password !== user.confirmPassword) return res.send("!Match")

  try {
    await user.save();
    const token = await user.generateAuthToken();

    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: "fchheda13@gmail.com",
    //     pass: "fenil1311",
    //   },
    // });

    // const mailOptions = {
    //   from: "fchheda13@gmail.com",
    //   to: username,
    //   subject: "Sending Email using Node.js",
    //   text: "That was easy!",
    // };

    // transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log("Email sent: " + info.response);
    //   }
    // });

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

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

module.exports = router;
