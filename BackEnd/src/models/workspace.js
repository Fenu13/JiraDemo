const mongoose = require("mongoose");
const validator = require("validator");

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    users: [
      {
        text: String,
        postedTo: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },

  {
    timestamps: true,
  }
);

const workspaces = mongoose.model("workspace", workspaceSchema);

module.exports = workspaces;
