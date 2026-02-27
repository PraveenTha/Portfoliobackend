const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const sendMail = require("../utils/sendMail");

/* ======================
   CREATE CONTACT (PUBLIC)
====================== */
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // ✅ basic validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // ✅ PHONE FORMAT CHECK (+91..., +1..., etc)
    if (!phone.startsWith("+") || phone.length < 10) {
      return res.status(400).json({ message: "Invalid phone number" });
    }
    // ✅ SAVE TO DB FIRST
    const contact = new Contact({
      name,
      email,
      phone,
      message,
    });

    await contact.save();

    // ✅ TRY EMAIL (FAIL HO JAYE TO BHI OK)
    try {
      await sendMail({
        subject: "New Portfolio Lead 🚀",
        html: `
          <h3>New Contact Message</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Message:</b><br/>${message}</p>
        `,
      });
    } catch (mailErr) {
      console.error("Email send failed:", mailErr.message);
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Contact submit error:", err);
    res.status(500).json({ message: "Contact submit failed" });
  }
});

/* ======================
   GET CONTACTS (ADMIN)
====================== */
router.get("/", async (req, res) => {
  const data = await Contact.find().sort({ createdAt: -1 });
  res.json(data);
});

/* ======================
   DELETE CONTACT (ADMIN)
====================== */
router.delete("/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
