const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

/* ==================================================
   🌍 PUBLIC ROUTES
================================================== */

// GET ALL PUBLISHED BLOGS
router.get("/public/all", async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({
      createdAt: -1,
    });
    res.json(blogs);
  } catch {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
});

// GET SINGLE BLOG BY SLUG
router.get("/public/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      isPublished: true,
    });

    if (!blog)
      return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch {
    res.status(500).json({ message: "Failed to fetch blog" });
  }
});

/* ==================================================
   🔐 ADMIN ROUTES
================================================== */

// GET ALL BLOGS (ADMIN)
router.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

// CREATE BLOG
router.post("/", upload.single("image"), async (req, res) => {
  const { title, shortDescription, content, tags, isPublished } = req.body;

  const blog = new Blog({
    title,
    shortDescription,
    content,
    tags: tags ? JSON.parse(tags) : [],
    isPublished: isPublished !== "false",
    image: req.file ? req.file.path : "",
    imagePublicId: req.file ? req.file.filename : "",
  });

  await blog.save();
  res.json(blog);
});

// UPDATE BLOG
router.put("/:id", upload.single("image"), async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Not found" });

  blog.title = req.body.title;
  blog.shortDescription = req.body.shortDescription;
  blog.content = req.body.content;
  blog.isPublished = req.body.isPublished !== "false";

  if (req.body.tags) blog.tags = JSON.parse(req.body.tags);

  if (req.file) {
    // delete old image from Cloudinary
    if (blog.imagePublicId) {
      await cloudinary.uploader.destroy(blog.imagePublicId);
    }

    blog.image = req.file.path;
    blog.imagePublicId = req.file.filename;
  }

  await blog.save();
  res.json(blog);
});

// DELETE BLOG
router.delete("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Not found" });

  if (blog.imagePublicId) {
    await cloudinary.uploader.destroy(blog.imagePublicId);
  }

  await Blog.findByIdAndDelete(req.params.id);

  res.json({ success: true });
});

module.exports = router;