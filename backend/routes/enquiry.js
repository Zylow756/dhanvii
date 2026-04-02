import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/send", async (req, res) => {
  console.log("BODY DATA:", req.body);
  const { name, phone, qualification } = req.body;

  try {
    // Transporter (Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "zylow0744@gmail.com",       // 👈 your gmail
        pass: "tcau mtxc aywi ydbg",         // 👈 NOT normal password
      },
    });

    // Mail content
    const mailOptions = {
      from: "zylow0744@gmail.com",
      to: "contact.dhanvi@gmail.com", // 👈 where you want to receive
      subject: "New Enquiry Form Submission",
      html: `
        <h3>New Student Enquiry</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Qualification:</b> ${qualification}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Email failed" });
  }
});

export default router;