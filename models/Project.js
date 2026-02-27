const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    // Cloudinary Image URL
    image: {
      type: String,
      default: "",
    },

    // Cloudinary Public ID (VERY IMPORTANT)
    imagePublicId: {
      type: String,
      default: "",
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProjectCategory",
      required: true,
    },

    projectLink: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);