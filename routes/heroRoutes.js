const express = require("express");
const router = express.Router();
const Hero = require("../models/Hero");

/**
 * 🔐 ADMIN: Get hero (admin panel)
 */
router.get("/", async (req, res) => {
  try {
    const hero = await Hero.findOne();
    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: "Hero fetch failed" });
  }
});

/**
 * 🌍 PUBLIC: Get hero (frontend)
 */
router.get("/public", async (req, res) => {
  try {
    const hero = await Hero.findOne();
    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: "Hero fetch failed" });
  }
});

/**
 * 🔐 ADMIN: Update hero
 */
router.put("/", async (req, res) => {
  try {
    const { heading, subheading, rotatingTexts, description } = req.body;

    let hero = await Hero.findOne();

    if (!hero) {
      hero = new Hero({
        heading,
        subheading,
        rotatingTexts,
        description,
      });
    } else {
      hero.heading = heading;
      hero.subheading = subheading;
      hero.rotatingTexts = rotatingTexts;
      hero.description = description;
    }

    await hero.save();
    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: "Hero update failed" });
  }
});

module.exports = router;
