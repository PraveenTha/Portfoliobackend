const express = require("express");
const router = express.Router();
const About = require("../models/About");
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

/* ========= GET ABOUT ========= */
router.get("/", async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch {
    res.status(500).json({ message: "About fetch failed" });
  }
});

/* ========= UPDATE ABOUT ========= */
router.put(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "resumeFile", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        title,
        rotatingSubtitles,
        description,
        removeImage,
        removeResume,
      } = req.body;

      let about = await About.findOne();
      if (!about) about = new About();

      /* ===== TEXT ===== */
      about.title = title || "";
      about.description = description || "";

      if (rotatingSubtitles) {
        try {
          about.rotatingSubtitles = JSON.parse(rotatingSubtitles);
        } catch {
          about.rotatingSubtitles = [];
        }
      }

      /* ===== IMAGE DELETE ===== */
      if (removeImage === "true" && about.imagePublicId) {
        await cloudinary.uploader.destroy(about.imagePublicId);
        about.image = "";
        about.imagePublicId = "";
      }

      /* ===== IMAGE UPLOAD ===== */
      if (req.files?.image?.length) {
        if (about.imagePublicId) {
          await cloudinary.uploader.destroy(about.imagePublicId);
        }

        about.image = req.files.image[0].path;
        about.imagePublicId = req.files.image[0].filename;
      }

      /* ===== RESUME DELETE ===== */
      if (removeResume === "true" && about.resumePublicId) {
        await cloudinary.uploader.destroy(about.resumePublicId, {
          resource_type: "raw",
        });
        about.resumeFile = "";
        about.resumePublicId = "";
      }

      /* ===== RESUME UPLOAD ===== */
      if (req.files?.resumeFile?.length) {
        if (about.resumePublicId) {
          await cloudinary.uploader.destroy(about.resumePublicId, {
            resource_type: "raw",
          });
        }

        about.resumeFile = req.files.resumeFile[0].path;
        about.resumePublicId = req.files.resumeFile[0].filename;
      }

      await about.save();
      res.json(about);
    } catch (err) {
      console.error("ABOUT UPDATE ERROR:", err);
      res.status(500).json({ message: "About update failed" });
    }
  }
);

module.exports = router;