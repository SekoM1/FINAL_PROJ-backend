require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post('/',(req,res) =>{ 
    const{firstname,number, email, days, hours, people} =req.body;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
    port: 465,
    secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
      });
      
      let mailOptions = {
        from: process.env.EMAIL,
        to: email && process.env.EMAIL,
        subject: "LyfStyl Booking Confirmation",
      
    text: `CONFIMATION for the reservation of ${firstname} with contact number: ${number}.
    Table is reserved for ${people} people on ${days} at ${hours}. `
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(400).send({msg:"error"+error})
        } else {
          console.log('Email sent: ' + info.response);
          res.send()
        }
      });
    
    
});
module.exports = router;