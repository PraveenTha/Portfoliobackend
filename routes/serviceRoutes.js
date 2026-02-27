const express = require("express");
const router = express.Router();
const Service = require("../models/Service");

/* =====================
   GET ALL (ADMIN)
===================== */
router.get("/", async (req, res) => {
  const data = await Service.find().sort({ createdAt: -1 });
  res.json(data);
});

/* =====================
   CREATE
===================== */
router.post("/", async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.json(service);
  } catch {
    res.status(500).json({ message: "Service create failed" });
  }
});

/* =====================
   UPDATE
===================== */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Service update failed" });
  }
});

/* =====================
   DELETE
===================== */
router.delete("/:id", async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
