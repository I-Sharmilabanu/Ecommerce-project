import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaUserCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-black fixed top-0 left-0 w-full z-50 px-6 py-5 text-white">
      <div className="flex justify-between items-center">
        {/* LOGO */}
        <Link to="/">
          <h1 className="font-bold text-3xl tracking-widest text-rose-500">
           🛍FASHION
          </h1>
        </Link>

        {/* MOBILE MENU ICON */}
        <button
          className="md:hidden text-xl"
          onClick={() => setMenuOpen(true)}
        >
          <FaBars />
        </button>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-rose-500">
            Home
          </Link>
          <Link to="/product" className="hover:text-rose-500">
            Product
          </Link>

          {!user ? (
            <Link to="/login" className="hover:text-rose-500">
              Login
            </Link>
          ) : (
            <div className="relative">
              <FaUserCircle
                size={28}
                className="cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              />

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <Link to="/addtocart" className="text-xl hover:text-rose-500">
            <FaShoppingCart />
          </Link>
        </div>
      </div>

      {/* MOBILE RIGHT SLIDE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-60 bg-black text-white z-50
        transform transition-transform duration-300 ease-in-out
        ${menuOpen ? "translate-x-0" : "translate-x-full"}
        md:hidden`}
      >
        {/* CLOSE ICON */}
        <div className="flex justify-end p-6">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* MENU ITEMS */}
        <div className="flex flex-col gap-6 px-8 text-lg font-semibold hover:text-rose-500">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link to="/product" onClick={() => setMenuOpen(false)}>
            Product
          </Link>

          <Link to="/addtocart" onClick={() => setMenuOpen(false)}>
            Cart
          </Link>

          {!user ? (
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          ) : (
            <button onClick={handleLogout} className="text-left">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
