const express = require("express");
const router = express.Router();
const Service = require("../models/Service");

router.get("/", async (req, res) => {
  const data = await Service.find({ isActive: true }).sort({ createdAt: -1 });
  res.json(data);
});

module.exports = router;
