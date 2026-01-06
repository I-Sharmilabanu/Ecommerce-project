import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { getAllProducts } from "../services/ProductService";
import Footer from "../components/Footer";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
      
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  // 🔍 SEARCH FILTER
  const filteredProducts = products.filter(
  (product) =>
    product?.title &&
    product.title.toLowerCase().includes(search.toLowerCase())
);



  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />

      {/* 🔍 SEARCH */}
      <div className="sticky w-3/4 top-28 left-0 z-50 ">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-full shadow-lg outline-none focus:ring-2 focus:ring-rose-500 ml-16"
        />
      </div>

      {/* 🛒 PRODUCTS */}
      <div className="pt-48 px-4 md:px-24">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg shadow hover:shadow-lg hover:border-rose-500 p-4 flex flex-col items-center"
            >
              {/* ✅ IMAGE (DO NOT CHANGE THIS) */}
              <img 
                src={item.image}
                alt={item.title}
                className="h-60 w-full object-contain rounded"
              />
              

              <h2 className="font-semibold text-lg mt-2 text-center">
                {item.title}
              </h2>

              <p className="text-gray-600 mt-1 text-center">
                ₹{item.price}
              </p>

              <Link to={`/products/${item._id}`} className="w-full mt-3">
                <button className="w-full bg-black text-white py-2 rounded hover:bg-rose-500 transition">
                  View
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
     
      <Footer />
    </div>
    
  );
};

export default Product;
