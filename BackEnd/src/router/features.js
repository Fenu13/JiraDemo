const express = require("express");
const Task = require("../models/tasks");
const auth = require("../middleware/auth");

const router = new express.Router();

// Post Comment
router.post("/tasks/features/:id", auth, async (req, res) => {
  try {
    //Find
    const result = await Task.findById(req.params.id);
    // console.log("RESULT==", result);

    if (!result) return res.send("Tasks id is not defined");

    //Check length
    if (!req.body.comments) return res.send("please enter the comment field");

    const comments = {
      text: req.body.comments,
      postedBy: req.user._id,
    };

    const update = await Task.findByIdAndUpdate(
      req.params.id,
      {
        $push: { comments: comments },
      },
      { new: true }
    );

    const result1 = await Task.findById(req.params.id);

    // await comment.save();
    res.status(201).send({
      comments: {
        commentMsg: req.body.comments,
        tasks: result1,
      },
    });
  } catch (error) {
    res.status(400).send({ error: "Tasks not found!!!" });
  }
});

router.delete("/deletecomment/:taskId/:commentId", async function (req, res) {
  try {
    // console.log("Comment=", req.params.commentId);

    const tasks = await Task.findById(req.params.taskId);
    // console.log("Tasks=", tasks);
    const comment = tasks.comments.filter(function (el) {
      return el._id != req.params.commentId;
    });
    // console.log("Comments=", comment);
    tasks.comments = comment;
    tasks.save();
    // Task.findOneAndUpdate(req.params.taskId,);

    //res.send("Success");
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});
module.exports = router;
