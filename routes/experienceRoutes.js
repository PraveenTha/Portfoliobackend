const express = require("express");
const router = express.Router();
const Experience = require("../models/Experience");
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

/* =========================
   GET ALL
========================= */
router.get("/", async (req, res) => {
  try {
    const data = await Experience.find().sort({ order: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Experience fetch failed" });
  }
});

/* =========================
   CREATE
========================= */
router.post("/", upload.single("logo"), async (req, res) => {
  try {
    const { role, company, duration, description, isActive } = req.body;

    const experience = new Experience({
      role,
      company,
      duration,
      description,
      isActive: isActive !== "false",
      logo: req.file ? req.file.path : "",
      logoPublicId: req.file ? req.file.filename : "",
    });

    await experience.save();
    res.json(experience);
  } catch (err) {
    res.status(500).json({ message: "Experience create failed" });
  }
});

/* =========================
   UPDATE
========================= */
router.put("/:id", upload.single("logo"), async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id);
    if (!exp) return res.status(404).json({ message: "Not found" });

    const { role, company, duration, description, isActive } = req.body;

    exp.role = role;
    exp.company = company;
    exp.duration = duration;
    exp.description = description;
    exp.isActive = isActive !== "false";

    if (req.file) {
      if (exp.logoPublicId) {
        await cloudinary.uploader.destroy(exp.logoPublicId);
      }

      exp.logo = req.file.path;
      exp.logoPublicId = req.file.filename;
    }

    await exp.save();
    res.json(exp);
  } catch (err) {
    res.status(500).json({ message: "Experience update failed" });
  }
});

/* =========================
   DELETE
========================= */
router.delete("/:id", async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id);
    if (!exp) return res.status(404).json({ message: "Not found" });

    if (exp.logoPublicId) {
      await cloudinary.uploader.destroy(exp.logoPublicId);
    }

    await exp.deleteOne();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Experience delete failed" });
  }
});

module.exports = router;