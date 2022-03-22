// require("dotenv").config;
const express = require("express");
const Menu = require("../models/Menu");
const auth = require("../middleware/auth");
const { getMenu } = require("../middleware/finders");

const router = express.Router();

// GET all menu
router.get("/", auth, async (req, res) => {
  try {
    const menu = await menu.find();
    res.status(201).send(menu);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET one menu

router.get("/:id", [auth, getMenu], (req, res, next) => {
  res.send(res.menu);
});

// CREATE a menu
router.post("/", auth, async (req, res, next) => {
  const { title, category, description, img, price, created_by } = req.body;
  console.log(title, category, description, img, price);

  let menu;

  img
    ? (menu = new menu({
        title,
        category,
        description,
        img,
        price,
        created_by: req.user._id,
      }))
    : (menu = new menu({
        title,
        category,
        description,
        img,
        price,
        created_by: req.user._id,
      }));

  try {
    const newmenu = await menu.save();
    res.status(201).json(newmenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a menu
router.put("/:id", [auth, getMenu], async (req, res, next) => {
  if (req.user._id !== res.menu.created_by)
    res
      .status(400)
      .json({ message: "You do not have the permission to update this menu" });

  const { title, category, description, img, price } = req.body;
  if (title) res.menu.title = title;
  if (category) res.menu.category = category;
  if (description) res.menu.description = description;
  if (img) res.menu.img = img;
  if (price) res.menu.price = price;

  try {
    const updatedmenu = await res.menu.save();
    res.status(201).send(updatedmenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a menu
router.delete("/:id", [auth, getMenu], async (req, res, next) => {
  if (req.user._id !== res.menu.created_by)
    res
      .status(400)
      .json({ message: "You do not have the permission to delete this menu" });
  try {
    await res.menu.remove();
    res.json({ message: "Deleted menu" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
