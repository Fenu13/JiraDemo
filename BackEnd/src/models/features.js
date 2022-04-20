const mongoose = require("mongoose");
const validator = require("validator");

const featuresSchema = new mongoose.Schema(
  {
    comments: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    task_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

featuresSchema.pre("save", async function (next) {
  const features = this;

  next();
});

const Features = mongoose.model("Features", featuresSchema);

module.exports = Features;
