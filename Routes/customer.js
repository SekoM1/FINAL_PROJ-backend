// require("dotenv").config();

const express = require("express");
const Customers = require("../models/Customers");

const router = express.Router();

let customers = [
  {
    id: 1,
    name: "Chad Hendricks",
    image: "https://i.postimg.cc/jj4wsftB/Chad2.jpg",
    message:
      "“Please thank your team for their professional, efficient and friendly service on Sat night.  The chefs smashed it and the drinks flowed freely!  Everyone was impressed and were quite taken with how cost effective it was to have Lyfstyl do what you did.”",
  },
  {
    id: 2,
    name: "Reese Adrahams",
    image: "https://i.postimg.cc/5NWVmRwq/Reese2.jpg",
    message:
      "“Great food at reasonable prices. Great service and the owners are fantasitc and extremely nice.”",
  },
  {
    id: 3,
    name: "Nande Bija",
    image: "https://i.postimg.cc/wBg5cgv8/nande.jpg",
    message:
      "“My favorite restaurant! Always good food and good service! Can't beat the price! Can accommodate large groups! The staff is the best in town and why we keep coming back. Highly recommend this restaurant!”",
  },
  {
    id: 4,
    name: "Siyanda MyBurgh",
    image: "https://i.postimg.cc/MTGTqrsj/Godwin.jpg",
    message:
      "“Wow, amazing Customers with consistently great food and service. You always feel welcome and the ambiance is relaxing. I've been eating here for over 2 years. Love this place.”",
  },
];

router.get("/", (req, res) => {
  res.send(customers);
});
module.exports = router;
