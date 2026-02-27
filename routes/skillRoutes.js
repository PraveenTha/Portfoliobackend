const express = require("express");
const router = express.Router();
const Skill = require("../models/Skill");

/* =====================
   GET ALL SKILLS
===================== */
router.get("/", async (req, res) => {
  const skills = await Skill.find().sort({ createdAt: -1 });
  res.json(skills);
});

/* =====================
   CREATE SKILL
===================== */
router.post("/", async (req, res) => {
  try {
    const { name, icon, level, isActive } = req.body;

    const skill = new Skill({
      name,
      icon,
      level,
      isActive,
    });

    await skill.save();
    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: "Skill create failed" });
  }
});

/* =====================
   UPDATE SKILL
===================== */
router.put("/:id", async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(skill);
  } catch {
    res.status(500).json({ message: "Skill update failed" });
  }
});

/* =====================
   DELETE SKILL
===================== */
router.delete("/:id", async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ message: "Skill delete failed" });
  }
});

module.exports = router;
