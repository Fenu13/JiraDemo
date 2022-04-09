const mongoose = require("mongoose");
const validator = require("validator");

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const workspaces = mongoose.model("workspace", workspaceSchema);

module.exports = workspaces;
