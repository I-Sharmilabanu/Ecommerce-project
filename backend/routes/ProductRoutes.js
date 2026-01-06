const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const upload = require("../config/multer");
const cloudinary = require("../config/cloudinary");

/* CREATE PRODUCT */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, price, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const product = new Product({
      title,
      price,
      description,
      image: result.secure_url,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: "Product creation failed" });
  }
});

/* GET ALL PRODUCTS */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Fetch products error:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

/* GET SINGLE PRODUCT */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
});

module.exports = router;
