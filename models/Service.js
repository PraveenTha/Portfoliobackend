const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    points: [
      {
        type: String, // 🔥 bullet points
      },
    ],

    icon: {
      type: String, // 🔥 React Icon name e.g. FaCode
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Service", serviceSchema);
