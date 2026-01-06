import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  /* ---------- LOAD CART ---------- */
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  /* ---------- QUANTITY ---------- */
  const increaseQty = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQty = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    }
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  /* ---------- TOTAL ---------- */
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  /* ---------- CHECKOUT ---------- */
  const handleCheckout = async () => {
    if (!user) {
      alert("Please login to proceed to checkout");
      navigate("/login");
      return;
    }

    try {
      const token = await auth.currentUser.getIdToken();

      const res = await fetch(
        `${API_BASE_URL}/api/payment/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: totalPrice * 100, // 💰 paise
          }),
        }
      );

      const order = await res.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "Ecommerce",
        description: "Cart Checkout",

        prefill: {
          name: user.displayName || "Customer",
          email: user.email,
        },

        method: {
          card: true,
          upi: true,
          netbanking: true,
          wallet: true,
        },

        handler: function () {
          alert("Payment Successful");

          localStorage.removeItem("cart");
          setCartItems([]);

          navigate("/dashboard");
        },

        theme: {
          color: "#e11d48",
        },
      };

      new window.Razorpay(options).open();
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Payment failed");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-28 px-6 md:px-24">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty</p>
        ) : (
          <>
            {/* CART ITEMS */}
            <div className="flex flex-col gap-6">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded shadow"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div>
                      <h2 className="font-semibold text-lg">{item.title}</h2>
                      <p className="text-gray-600">₹{item.price}</p>
                      <p className="text-sm text-gray-500">
                        Color: {item.color} | Size: {item.size}
                      </p>
                    </div>
                  </div>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-3 mt-4 md:mt-0">
                    <button
                      onClick={() => decreaseQty(index)}
                      className="px-3 py-1 border rounded"
                    >
                      -
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(index)}
                      className="px-3 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>

                  {/* PRICE */}
                  <div className="flex items-center gap-6 mt-4 md:mt-0">
                    <p className="font-semibold">
                      ₹{item.price * item.quantity}
                    </p>
                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="mt-8 flex justify-end">
              <div className="bg-white p-6 rounded shadow w-full md:w-96">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="flex justify-between mb-2">
                  <span>Total Items</span>
                  <span>{totalItems}</span>
                </div>

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="mt-6 w-full bg-black text-white py-2 rounded hover:bg-rose-500 transition"
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AddToCart;
