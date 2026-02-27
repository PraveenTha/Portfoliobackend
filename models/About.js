const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },

    rotatingSubtitles: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      default: "",
    },

    // Cloudinary Image URL
    image: {
      type: String,
      default: "",
    },

    // Cloudinary Image Public ID (IMPORTANT)
    imagePublicId: {
      type: String,
      default: "",
    },

    // Cloudinary Resume URL
    resumeFile: {
      type: String,
      default: "",
    },

    // Cloudinary Resume Public ID (IMPORTANT)
    resumePublicId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("About", aboutSchema);