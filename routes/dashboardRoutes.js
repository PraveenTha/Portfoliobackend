const express = require("express");
const router = express.Router();

const Project = require("../models/Project");
const ProjectCategory = require("../models/ProjectCategory");
const Skill = require("../models/Skill");
const Service = require("../models/Service");
const Experience = require("../models/Experience");
const Contact = require("../models/Contact");

/* =========================
   DASHBOARD STATS
========================= */
router.get("/", async (req, res) => {
  try {
    const stats = {
      projects: await Project.countDocuments(),
      categories: await ProjectCategory.countDocuments(),
      skills: await Skill.countDocuments(),
      services: await Service.countDocuments(),
      experience: await Experience.countDocuments(),
      contacts: await Contact.countDocuments(),
    };

    res.json(stats);
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Dashboard data fetch failed" });
  }
});

module.exports = router;
