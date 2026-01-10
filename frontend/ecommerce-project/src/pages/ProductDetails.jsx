import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getProductById } from "../services/ProductService";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />

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

            {/* PRICE */}
            <p className="text-xl font-semibold">₹{product.price}</p>

            {/* DISCOUNT BELOW PRICE */}
            {product.Discount && (
              <p className="text-green-600 font-medium text-sm">
                Discount: {product.Discount}
              </p>
            )}

            <p className="text-gray-600">{product.description}</p>

            {/* COLORS */}
            {product.colors?.length > 0 && (
              <div>
                <h3 className="font-semibold">Color:</h3>
                <div className="flex gap-2">
                  {product.colors.map((color, idx) => (
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
            )}

            {/* SIZES */}
            {product.sizes?.length > 0 && (
              <div>
                <h3 className="font-semibold">Size:</h3>
                <div className="flex gap-2">
                  {product.sizes.map((size, idx) => (
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
            )}

            {/* CLOTH DETAILS + RATING */}
            {product.clothDetails && (
              <div>
                <h3 className="font-semibold">Cloth Details:</h3>
                <p className="text-gray-600">{product.clothDetails}</p>

                {product.Rating && (
                  <p className="text-yellow-500 text-sm mt-1">
                    Rating: {product.Rating}
                  </p>
                )}
              </div>
            )}

            {/* RETURN POLICY */}
            {product.returnPolicy && (
              <div>
                <h3 className="font-semibold">Return Policy:</h3>
                <p className="text-gray-600">{product.returnPolicy}</p>
              </div>
            )}

            {/* ADD TO CART BUTTON */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleAddToCart}
                className="py-2 px-6 bg-black text-white rounded hover:bg-rose-500 transition"
              >
                Add to Cart
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
