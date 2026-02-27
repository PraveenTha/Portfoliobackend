const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

/* =========================
   PUBLIC PROJECTS
========================= */
router.get("/", async (req, res) => {
  const { category } = req.query;

  const filter = { isActive: true };
  if (category) filter.category = category;

  const data = await Project.find(filter)
    .populate("category")
    .sort({ createdAt: -1 });

  res.json(data);
});

module.exports = router;
