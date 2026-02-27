const mongoose = require("mongoose");

const socialSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: true, // linkedin, github, instagram
      trim: true,
    },

    icon: {
      type: String,
      required: true, // fa-brands fa-linkedin
      trim: true,
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },

    enabled: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false },
);

const settingsSchema = new mongoose.Schema(
  {
    socials: {
      type: [socialSchema],
      default: [],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Settings", settingsSchema);
