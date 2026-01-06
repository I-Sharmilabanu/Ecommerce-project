require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const Razorpay = require("razorpay");

const productRoutes = require("./routes/ProductRoutes");
const verifyUser = require("./verifyUser");

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(
  cors({
    origin: ["https://ecommerce-project-jzyv.vercel.app",
      "http://localhost:5173"], // later you can restrict
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

/* ---------- RAZORPAY (TEST MODE ONLY) ---------- */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // rzp_test_
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ---------- ROUTES ---------- */

// Public
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Products (public)
app.use("/api/products", productRoutes);

// Auth test (protected)
app.get("/api/test-auth", verifyUser, (req, res) => {
  res.json({
    success: true,
    message: "Authorized user",
    user: {
      uid: req.user.uid,
      email: req.user.email,
    },
  });
});

// Create Razorpay Order (protected)
app.post("/api/payment/create-order", verifyUser, async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const order = await razorpay.orders.create({
      amount: Number(amount) * 100, // INR → paise
      currency: "INR",
      receipt: `order_${Date.now()}`,
    });

    res.status(200).json(order);
  } catch (error) {
    console.error("Razorpay error:", error);
    res.status(500).json({ message: "Payment order failed" });
  }
});

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ✅`);
});
