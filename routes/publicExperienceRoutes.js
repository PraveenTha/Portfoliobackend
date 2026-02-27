const express = require("express");
const router = express.Router();
const Experience = require("../models/Experience");

/* =========================
   GET ACTIVE EXPERIENCE (PUBLIC)
========================= */
router.get("/", async (req, res) => {
  try {
    const data = await Experience.find({ isActive: true }).sort({ order: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Experience fetch failed" });
  }
});

module.exports = router;
