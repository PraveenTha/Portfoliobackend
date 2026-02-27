const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    let folder = "portfolio/misc";
    let resourceType = "image";

   if (file.fieldname === "resumeFile") {
  folder = "portfolio/resume";
  resourceType = "image";  // ✅ CHANGE THIS
}

    if (file.fieldname === "projectImage") {
      folder = "portfolio/projects";
      resourceType = "image";
    }

    if (file.fieldname === "logo") {
      folder = "portfolio/experience";
      resourceType = "image";
    }

    if (file.fieldname === "image") {
      folder = "portfolio/blogs";
      resourceType = "image";
    }

    return {
      folder,
      resource_type: resourceType,
      type: "upload",          // 🔥 IMPORTANT
      access_mode: "public",   // 🔥 VERY IMPORTANT
    };
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

module.exports = upload;