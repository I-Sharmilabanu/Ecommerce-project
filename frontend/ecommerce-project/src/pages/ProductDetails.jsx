import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getProductById } from "../services/ProductService";
import { useAuth } from "../context/AuthContext";
import { auth } from "../config/firebase";
import API_BASE_URL from "../config/api";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState("");

  /* ---------- FETCH PRODUCT ---------- */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
        setMainImage(data.image);
        setSelectedColor(data.colors?.[0] || "");
        setSelectedSize(data.sizes?.[0] || "");
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="p-6 mt-24 text-center">Product not found</p>;
  }

  /* ---------- ADD TO CART ---------- */
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(
      (item) =>
        item.id === product._id &&
        item.color === selectedColor &&
        item.size === selectedSize
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        id: product._id,
        title: product.title,
        price: product.price,
        image: product.image,
        color: selectedColor,
        size: selectedSize,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/addtocart");
  };

  /* ---------- BUY NOW ---------- */
  const handleBuyNow = async () => {
    if (!user) {
      alert("Please login to continue");
      navigate("/login");
      return;
    }

    if (!selectedColor || !selectedSize) {
      alert("Please select color and size");
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
            amount: product.price * 100, // 💰 paise
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
        description: "Test Payment",

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
          navigate("/dashboard");
        },

        theme: {
          color: "#e11d48",
        },
      };

      new window.Razorpay(options).open();
    } catch (error) {
      console.error("Buy now error:", error);
      alert("Payment failed");
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />

      {/* HERO VIDEO */}
      <div className="relative h-96 w-full">
        <video
          className="absolute top-0 left-0 w-full h-96 object-cover mt-12"
          src="https://res.cloudinary.com/da22f8zk9/video/upload/v1767622261/0_Shopping_Cart_Add_To_Cart_3840x2160_bjkdzh.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <div className="pt-28 px-6 md:px-24">
        <div className="flex flex-col md:flex-row gap-8">
          {/* LEFT IMAGE */}
          <div className="flex flex-col gap-4">
            <img
              src={mainImage}
              alt={product.title}
              className="w-full md:w-96 h-96 object-cover border rounded"
            />

            <div className="flex gap-2">
              {[product.image, ...(product.additionalImages || [])].map(
                (img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="thumb"
                    className="w-20 h-20 object-cover border cursor-pointer"
                    onClick={() => setMainImage(img)}
                  />
                )
              )}
            </div>
          </div>

          {/* RIGHT DETAILS */}
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-xl font-semibold">₹{product.price}</p>
            <p className="text-gray-600">{product.description}</p>

            {/* COLORS */}
            <div>
              <h3 className="font-semibold">Color:</h3>
              <div className="flex gap-2">
                {product.colors?.map((color, idx) => (
                  <button
                    key={idx}
                    className={`px-3 py-1 border rounded ${
                      selectedColor === color ? "border-rose-500" : ""
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* SIZES */}
            <div>
              <h3 className="font-semibold">Size:</h3>
              <div className="flex gap-2">
                {product.sizes?.map((size, idx) => (
                  <button
                    key={idx}
                    className={`px-3 py-1 border rounded ${
                      selectedSize === size ? "border-rose-500" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Cloth Details:</h3>
              <p className="text-gray-600">{product.clothDetails}</p>
            </div>

            <div>
              <h3 className="font-semibold">Return Policy:</h3>
              <p className="text-gray-600">{product.returnPolicy}</p>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleAddToCart}
                className="py-2 px-6 bg-black text-white rounded hover:bg-rose-500 transition"
              >
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="py-2 px-6 bg-black text-white rounded hover:bg-rose-500 transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
