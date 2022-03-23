require ("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const menuRoute = require("./Routes/menu");
const userRoute = require("./Routes/user");
const contactRoute = require("./Routes/contact");
const authRoute = require("./middleware/auth");
const bcrypt = require("bcrypt");
const cors = require('cors')

// app.post()
app.use(cors())
mongoose
  .connect(process.env.MONGO_URL)

  .then(() => console.log("Connected to DB"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/users", userRoute);
app.use("/contact", contactRoute);
app.use("/menu", menuRoute);
app.get("/", (req, res) => {
  res.send("Seko's API");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Backend server is running");
});
