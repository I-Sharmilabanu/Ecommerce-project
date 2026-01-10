require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const Razorpay = require("razorpay");
const crypto = require("crypto"); // ✅ REQUIRED for verification

const productRoutes = require("./routes/ProductRoutes");
const verifyUser = require("./verifyUser");

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(
  cors({
    origin: [
      "https://ecommerce-project-fqjx.vercel.app", // frontend
      "http://localhost:5173", // local dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ---------- MONGODB ---------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected ✅"))
  .catch((err) => console.error("Mongo error:", err));

/* ---------- RAZORPAY ---------- */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ---------- ROUTES ---------- */
app.get("/", (req, res) => res.send("Backend running 🚀"));

app.use("/api/products", productRoutes);

/* ---------- AUTH TEST ---------- */
app.get("/api/test-auth", verifyUser, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

/* ---------- CREATE ORDER ---------- */
app.post("/api/payment/create-order", verifyUser, async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: Number(amount), // ✅ already in paise from frontend
      currency: "INR",
      receipt: `order_${Date.now()}`,
    });

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment order failed" });
  }
});

/* ---------- VERIFY PAYMENT ---------- */
app.post("/api/payment/verify", verifyUser, (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // ✅ PAYMENT VERIFIED
      return res.json({ success: true });
    } else {
      return res.status(400).json({ success: false });
    }
  } catch (err) {
    res.status(500).json({ message: "Payment verification failed" });
  }
});

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} ✅`)
);
