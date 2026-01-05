import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  // Increase quantity
  const increaseQty = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Decrease quantity
  const decreaseQty = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    }
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove item
  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  /* ---------- CHECKOUT / BUY NOW ---------- */
  const handleCheckout = async () => {
    // 1️⃣ Check login
    if (!user) {
      alert("Please login to proceed to checkout");
      navigate("/login");
      return;
    }

    try {
      // 2️⃣ Get Firebase token
      const token = await auth.currentUser.getIdToken();

      // 3️⃣ Call backend to create Razorpay order
      const res = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: totalPrice }),
      });

      const order = await res.json();

      // 4️⃣ Open Razorpay TEST MODE
      const options = {
        key:import.meta.env.VITE_RAZORPAY_KEY_ID, // 🔴 Replace with YOUR TEST key
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "Ecommerce",
        description: "Dummy Payment (Test Mode)",
        handler: function (response) {
          alert("Payment successful ");
          

          // Clear cart
          localStorage.removeItem("cart");
          setCartItems([]);

          // Optional redirect
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
            {/* Cart Items */}
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

                  {/* Quantity */}
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

                  {/* Price & Remove */}
                  <div className="flex items-center gap-6 mt-4 md:mt-0">
                    <p className="font-semibold">₹{item.price * item.quantity}</p>
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

            {/* Cart Summary */}
            <div className="mt-8 flex justify-end">
              <div className="bg-white p-6 rounded shadow w-full md:w-96">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Total Items</span>
                  <span>{cartItems.length}</span>
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
      
      <Footer/>
    </div>
  );
};

export default AddToCart;
