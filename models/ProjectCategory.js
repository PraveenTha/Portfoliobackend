const mongoose = require("mongoose");

const projectCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

/* 🔥 AUTO SLUG GENERATE */
projectCategorySchema.pre("validate", function (next) {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
  next();
});

module.exports = mongoose.model("ProjectCategory", projectCategorySchema);
