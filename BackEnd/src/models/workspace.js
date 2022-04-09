const mongoose = require("mongoose");
const validator = require("validator");

const worksSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    register_no: {
      type: Number,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const workspace = mongoose.model("workspace", worksSchema);

module.exports = workspace;
