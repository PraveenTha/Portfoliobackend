const express = require("express");
const router = express.Router();
const Settings = require("../models/Settings");

/* =========================
   GET SETTINGS (PUBLIC + ADMIN)
========================= */
router.get("/", async (req, res) => {
  try {
    let settings = await Settings.findOne();

    // 👇 agar pehli baar hai to empty doc return karo
    if (!settings) {
      settings = await Settings.create({ socials: [] });
    }

    res.json(settings);
  } catch (err) {
    console.error("SETTINGS FETCH ERROR:", err);
    res.status(500).json({ message: "Settings fetch failed" });
  }
});

/* =========================
   UPDATE SETTINGS
========================= */
router.put("/", async (req, res) => {
  try {
    const { socials } = req.body;

    // 🛑 BASIC VALIDATION
    if (!Array.isArray(socials)) {
      return res.status(400).json({ message: "Invalid socials data" });
    }

    // 🧹 CLEAN + VALIDATE DATA
    const cleanedSocials = socials
      .filter((s) => s.platform && s.icon && s.url)
      .map((s) => ({
        platform: s.platform.trim(),
        icon: s.icon.trim(), // fa-brands fa-linkedin
        url: s.url.trim(),
        enabled: s.enabled !== false, // default true
      }));

    let settings = await Settings.findOne();

    if (!settings) {
      settings = new Settings({ socials: cleanedSocials });
    } else {
      settings.socials = cleanedSocials;
    }

    await settings.save();
    res.json(settings);
  } catch (err) {
    console.error("SETTINGS UPDATE ERROR:", err);
    res.status(500).json({ message: "Settings update failed" });
  }
});

module.exports = router;
