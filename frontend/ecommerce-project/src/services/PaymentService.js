import { auth } from "../config/firebase";

const PAYMENT_URL = "http://localhost:5000/api/payment";

// Create Razorpay order (TEST MODE)
export const createOrder = async (amount) => {
  try {
    const token = await auth.currentUser.getIdToken();
    const res = await fetch(`${PAYMENT_URL}/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount }),
    });
    return await res.json();
  } catch (err) {
    console.error("PaymentService error:", err);
    return null;
  }
};
