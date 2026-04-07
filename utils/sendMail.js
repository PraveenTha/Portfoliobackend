const { Resend } = require("resend");

/* =========================
   RESEND INIT
========================= */
const resend = new Resend(process.env.RESEND_API_KEY);

/* =========================
   SEND MAIL FUNCTION
========================= */
const sendMail = async ({ subject, html }) => {
  try {
    // 🔍 Debug log
    console.log("📤 Sending mail via Resend...");

    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is missing in environment variables");
    }

    const response = await resend.emails.send({
      from: "onboarding@resend.dev", // later domain verify kar lena
      to: "praveentha8@gmail.com", // 👈 yaha apna email daal (safe)
      subject,
      html,
    });

    console.log("✅ Email sent successfully:", response);
    return response;

  } catch (err) {
    console.error("🔥 Mail send failed:", err);
    throw err;
  }
};

module.exports = sendMail;
