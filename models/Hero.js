const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema(
  {
    // 🔥 REQUIRED MAIN HEADING
    heading: {
      type: String,
      required: true,
      trim: true,
    },

    // ✅ OPTIONAL STATIC SUBHEADING
    subheading: {
      type: String,
      default: "",
      trim: true,
    },

    // ✅ OPTIONAL ROTATING TEXTS
    rotatingTexts: {
      type: [String],
      default: [],
    },

    // ✅ OPTIONAL DESCRIPTION
    description: {
      type: String,
      default: "",
      trim: true,
    },

    // OPTIONAL (future use)
    image: {
      type: String,
      default: "",
    },

    resume: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hero", heroSchema);
