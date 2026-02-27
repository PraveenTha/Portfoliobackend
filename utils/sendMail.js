const nodemailer = require("nodemailer");
const { Resend } = require("resend");

const isProduction = process.env.NODE_ENV === "production";

/* =========================
   RESEND (Production)
========================= */
let resend = null;

if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
}

/* =========================
   NODEMAILER (SMTP)
========================= */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT == 465, // true only for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/* =========================
   SEND MAIL FUNCTION
========================= */
const sendMail = async ({ subject, html }) => {
  try {
    /* ===== PRODUCTION → RESEND ===== */
    if (isProduction && resend) {
      console.log("📤 Sending mail via Resend...");

      await resend.emails.send({
        from: "onboarding@resend.dev", // change after domain verify
        to: process.env.SMTP_USER,
        subject,
        html,
      });

      console.log("✅ Email sent via Resend");
      return;
    }

    /* ===== LOCAL → SMTP ===== */
    console.log("📤 Sending mail via SMTP...");

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject,
      html,
    });

    console.log("✅ Email sent via SMTP");
  } catch (err) {
    console.error("🔥 Mail send failed:", err.message);
    throw err;
  }
};

module.exports = sendMail;
