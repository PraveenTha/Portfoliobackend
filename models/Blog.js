const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    slug: { type: String, unique: true },

    shortDescription: String,

    content: { type: String, required: true },

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

    tags: {
      type: [String],
      default: [],
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

/* AUTO SLUG */
blogSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  }
  next();
});

module.exports = mongoose.model("Blog", blogSchema);