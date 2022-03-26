// require("dotenv").config();
const express = require("express");
const Menu = require("../models/Menu");
const { authenticateToken, verifyAdmin } = require("../middleware/auth");
const { getMenu } = require("../middleware/finders");

const router = express.Router();

// GET all menu
router.get("/", authenticateToken, async (req, res) => {
  try {
    const menu = await Menu.find();
    res.status(201).send(menu);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET one menu

router.get("/:id", [authenticateToken, getMenu], (req, res, next) => {
  res.send(res.menu);
});

// CREATE a menu
router.post("/add", verifyAdmin, async (req, res, next) => {
  const { title, category, desc, img, price } = req.body;
  console.log(title, category, desc, img, price);

  let menu;

  img
    ? (menu = new Menu({
        title,
        category,
        desc,
        img,
        price,
        created_by: req.user._id,
      }))
    : (menu = new Menu({
        title,
        category,
        desc,
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
router.put("/:id", [verifyAdmin, getMenu], async (req, res, next) => {
  if (req.user._id !== res.menu.created_by)
    res
      .status(400)
      .json({ message: "You do not have the permission to update this menu" });

  const { title, category, desc, img, price } = req.body;
  if (title) res.menu.title = title;
  if (category) res.menu.category = category;
  if (desc) res.menu.desc = desc;
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
router.delete("/:id", [verifyAdmin, getMenu], async (req, res, next) => {
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
