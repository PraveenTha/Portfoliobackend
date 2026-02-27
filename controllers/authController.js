const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ REGISTER ADMIN
const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exists = await Admin.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = new Admin({ email, password });
    await admin.save();

    res.status(201).json({
      message: "Admin created successfully",
      email: admin.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ LOGIN ADMIN
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔥 VERY IMPORTANT EXPORT
module.exports = {
  registerAdmin,
  loginAdmin,
};
