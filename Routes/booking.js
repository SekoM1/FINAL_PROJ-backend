const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();
const auth = require('../middleware/auth')

const router = express.Router();

router.get("/", (req, res) => {
  res.send({ msg: "getting reservations" });
});

router.post("/", auth, (req, res) => {
//   const { fullname,number, email, days, hours, people } = req.body;
//   console.log(process.env.EMAIL, process.env.PASS);
//   console.log(email, fullname,number, days, hours, people);
//   console.log(req.body);
    console.log(req.user)
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 1300,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: req.user.email && process.env.EMAIL,
    subject: "LyfStyl Booking Confirmation",
    

    text: `CONFIMATION for the reservation of ${req.user.firstname} with contact number: ${req.body.number}.
  Table is reserved for ${req.body.people} people on ${req.body.days} at ${req.body.hours}. `,
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
