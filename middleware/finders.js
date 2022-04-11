const User = require("../models/User");
const Menu = require("../models/Menu");
const Customers = require("../models/Customers");


async function getUser(req, res, next) {
  let User;
  try {
    User = await User.findById(req.params.id);

    if (!User) res.status(404).json({ message: "Could not find User" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.User = User;
  next();
}

async function getMenu(req, res, next) {
  let Menu;
  try {
    Menu = await Menu.findById(req.params.id);

    if (!Menu) res.status(404).json({ message: "Could not find Menu" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.Menu = Menu;
  next();
}

async function getCustomers(req, res, next) {
  let Customers;
  try {
    Customers = await Customers.findById(req.params.id);

    if (!Customers) res.status(404).json({ message: "Could not find Customer" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.Customers = Customers;
  next();
}

module.exports = { getUser, getMenu, getCustomers};
