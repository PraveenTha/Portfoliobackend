const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "image") cb(null, "uploads/images");
    else cb(null, "uploads/resume");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

module.exports = multer({ storage });
