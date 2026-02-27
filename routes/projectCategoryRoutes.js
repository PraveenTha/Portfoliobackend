const express = require("express");
const router = express.Router();
const ProjectCategory = require("../models/ProjectCategory");
const slugify = require("slugify");

/* =========================
   GET ALL CATEGORIES (ADMIN)
========================= */
router.get("/", async (req, res) => {
  try {
    const data = await ProjectCategory.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Category fetch failed" });
  }
});

/* =========================
   CREATE CATEGORY
========================= */
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Category name required" });
    }

    const slug = slugify(name, { lower: true, strict: true });

    // 🔥 prevent duplicate slug
    const exist = await ProjectCategory.findOne({ slug });
    if (exist) {
      return res.status(409).json({ message: "Category already exists" });
    }

    const category = new ProjectCategory({
      name: name.trim(),
      slug, // ✅ NEVER NULL
      isActive: true,
    });

    await category.save();
    res.json(category);
  } catch (err) {
    console.error("Category create error:", err);
    res.status(500).json({ message: "Category create failed" });
  }
});

/* =========================
   UPDATE CATEGORY
========================= */
router.put("/:id", async (req, res) => {
  try {
    const { name, isActive } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Category name required" });
    }

    const slug = slugify(name, { lower: true, strict: true });

    const cat = await ProjectCategory.findById(req.params.id);
    if (!cat) {
      return res.status(404).json({ message: "Category not found" });
    }

    // 🔥 duplicate check except current
    const exist = await ProjectCategory.findOne({
      slug,
      _id: { $ne: cat._id },
    });

    if (exist) {
      return res.status(409).json({ message: "Category already exists" });
    }

    cat.name = name.trim();
    cat.slug = slug;
    cat.isActive = isActive ?? true;

    await cat.save();
    res.json(cat);
  } catch (err) {
    console.error("Category update error:", err);
    res.status(500).json({ message: "Category update failed" });
  }
});

/* =========================
   DELETE CATEGORY
========================= */
router.delete("/:id", async (req, res) => {
  try {
    await ProjectCategory.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Category delete failed" });
  }
});

module.exports = router;
