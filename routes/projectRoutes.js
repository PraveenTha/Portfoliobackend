const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

/* =========================
   GET ALL PROJECTS
========================= */
router.get("/", async (req, res) => {
  try {
    const data = await Project.find()
      .populate("category")
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ message: "Project fetch failed" });
  }
});

/* =========================
   CREATE PROJECT
========================= */
router.post("/", (req, res) => {
  upload.single("projectImage")(req, res, async function (err) {

    if (err) {
      console.error("Upload Error:", err.message);
      return res.status(400).json({ message: err.message });
    }

    try {
      const {
        title,
        shortDescription,
        description,
        tags,
        category,
        projectLink,
        isActive,
      } = req.body;

      let parsedTags = [];
      if (tags) {
        try {
          parsedTags = JSON.parse(tags);
        } catch {
          parsedTags = [];
        }
      }

      const project = new Project({
        title,
        shortDescription,
        description,
        tags: parsedTags,
        category,
        projectLink,
        isActive: isActive === "false" ? false : true,
        image: req.file ? req.file.path : "",
        imagePublicId: req.file ? req.file.filename : "",
      });

      await project.save();
      res.json(project);

    } catch (error) {
      console.error("Create Error:", error);
      res.status(500).json({ message: "Project create failed" });
    }
  });
});

/* =========================
   UPDATE PROJECT (🔥 FIXED)
========================= */
router.put("/:id", (req, res) => {
  upload.single("projectImage")(req, res, async function (err) {

    if (err) {
      console.error("Upload Error:", err.message);
      return res.status(400).json({ message: err.message });
    }

    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ message: "Not found" });
      }

      // ✅ SAFE BODY READ
      const title = req.body.title;
      const shortDescription = req.body.shortDescription;
      const description = req.body.description;
      const category = req.body.category;
      const projectLink = req.body.projectLink;
      const isActive = req.body.isActive;

      let parsedTags = [];
      if (req.body.tags) {
        try {
          parsedTags = JSON.parse(req.body.tags);
        } catch {
          parsedTags = [];
        }
      }

      // ✅ SAFE UPDATE (NO CRASH)
      if (title) project.title = title;
      if (shortDescription) project.shortDescription = shortDescription;
      if (description) project.description = description;
      if (category) project.category = category;
      if (projectLink) project.projectLink = projectLink;
      if (parsedTags.length) project.tags = parsedTags;

      project.isActive = isActive === "false" ? false : true;

      // ✅ IMAGE UPDATE (SAFE)
      if (req.file) {
        if (project.imagePublicId) {
          try {
            await cloudinary.uploader.destroy(project.imagePublicId);
          } catch (err) {
            console.log("Cloudinary delete failed (ignore)");
          }
        }

        project.image = req.file.path;
        project.imagePublicId = req.file.filename;
      }

      await project.save();
      res.json(project);

    } catch (error) {
      console.error("🔥 UPDATE ERROR:", error);
      res.status(500).json({ message: "Project update failed" });
    }
  });
});

/* =========================
   DELETE PROJECT
========================= */
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Not found" });

    if (project.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(project.imagePublicId);
      } catch (err) {
        console.log("Cloudinary delete failed (ignore)");
      }
    }

    await project.deleteOne();
    res.json({ success: true });

  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ message: "Project delete failed" });
  }
});

module.exports = router;
