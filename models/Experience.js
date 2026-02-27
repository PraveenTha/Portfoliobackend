const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: "",
    },

    company: {
      type: String,
      default: "",
    },

    duration: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    // Cloudinary Image URL
    logo: {
      type: String,
      default: "",
    },

    // Cloudinary Public ID (IMPORTANT)
    logoPublicId: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Experience", experienceSchema);