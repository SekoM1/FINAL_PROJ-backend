const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const router = express.Router();

router.get("/", (req, res) => {
  res.send({ msg: "getting reservations" });
});

router.post("/", (req, res) => {
  const { fullname,number, email, days, hours, people } = req.body;
  console.log(process.env.EMAIL, process.env.PASS);
  console.log(email, fullname,number, days, hours, people);
  console.log(req.body);

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
    from: email,
    to: "seko.n.mpofu@gmail.com" ,
    cc: "${email}",

    text: `CONFIMATION for the reservation of ${fullname} with contact number: ${number}.
  Table is reserved for ${people} people on ${days} at ${hours}. `,
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
