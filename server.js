const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* =======================
   CORS (NO MORE ERRORS)
======================= */
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* =======================
   BODY PARSER
======================= */
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

/* =======================
   ROUTES
======================= */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/admin/hero", require("./routes/heroRoutes"));
app.use("/api/admin/about", require("./routes/aboutRoutes"));
app.use("/api/about", require("./routes/aboutRoutes"));
app.use("/api/admin/settings", require("./routes/settingsRoutes"));
app.use("/api/admin/skills", require("./routes/skillRoutes"));
app.use("/api/skills", require("./routes/skillRoutes"));
app.use("/api/admin/experience", require("./routes/experienceRoutes"));
app.use("/api/experience", require("./routes/publicExperienceRoutes"));
app.use("/api/admin/projects", require("./routes/projectRoutes"));
app.use("/api/projects", require("./routes/publicProjectRoutes"));
app.use("/api/admin/project-categories", require("./routes/projectCategoryRoutes"));
app.use("/api/admin/services", require("./routes/serviceRoutes"));
app.use("/api/services", require("./routes/publicServiceRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/admin/blogs", require("./routes/blogRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));

/* =======================
   HEALTH CHECK
======================= */
app.get("/", (req, res) => {
  res.status(200).send("Backend API is running 🚀");
});

/* =======================
   DATABASE
======================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

/* =======================
   GLOBAL ERROR HANDLER
======================= */
app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err.message);
  res.status(500).json({
    message: err.message || "Server Error",
  });
});

/* =======================
   SERVER
======================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});