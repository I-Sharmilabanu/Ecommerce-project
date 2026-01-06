require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const Razorpay = require("razorpay");

const productRoutes = require("./routes/ProductRoutes"); // ✅ MUST MATCH FILE NAME
const verifyUser = require("./verifyUser");

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(
  cors({
    origin: [
      "https://ecommerce-project-fqjx.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ---------- MONGODB ---------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.error("Mongo error:", err));

/* ---------- RAZORPAY ---------- */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ---------- ROUTES ---------- */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use("/api/products", productRoutes);

app.get("/api/test-auth", verifyUser, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

app.post("/api/payment/create-order", verifyUser, async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: `order_${Date.now()}`,
    });

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment order failed" });
  }
});

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ✅`);
});
