const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    icon: {
      type: String, // image path OR icon class
      default: "",
    },

    level: {
      type: Number, // percentage
      required: true,
      min: 0,
      max: 100,
    },

    isActive: {
      type: Boolean,
      default: true, // show / hide
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);
