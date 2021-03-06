// require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ msg: "getting contacts" });
});

router.post("/", (req, res) => {
  const { firstname, lastname, email, message } = req.body;
  console.log(process.env.EMAIL, process.env.PASS);
  console.log(req.body);

  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    // port: 1300,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: "seko.n.mpofu@gmail.com",
    text: `${firstname} ${lastname} has contacted you:${message} ,please contact them back on ${email} `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(400).send({ msg: "email not sent" });
    } else {
      console.log("Email sent: " + info.response);
      res.send({ msg: "email has been sent successfully" });
    }
  });
});

module.exports = router;
