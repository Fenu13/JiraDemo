const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const req = require("express/lib/request");

const tasksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      required: true,
    },
    attachment: {
      type: String,
    },
    status: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", tasksSchema);

module.exports = Task;
