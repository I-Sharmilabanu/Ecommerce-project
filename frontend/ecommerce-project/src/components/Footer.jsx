import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";


function Footer() {
  return (
    
    <footer className="w-full bg-black text-white pt-14 mt-10">
      
      {/* TOP FOOTER */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-8 pb-12">
    
        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold tracking-widest mb-4">FASHION</h2>
          <p className="text-gray-400 text-sm">
            Your one-stop destination for trendy fashion, quality products,
            and unbeatable prices.
          </p>
        </div>
    
        {/* SHOP */}
        <div>
          <h3 className="font-semibold mb-4">Shop</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Men</li>
            <li>Women</li>
            <li>Kids</li>
            <li>Accessories</li>
          </ul>
        </div>
    
        {/* HELP */}
        <div>
          <h3 className="font-semibold mb-4">Help</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>FAQs</li>
            <li>Shipping</li>
            <li>Returns</li>
            <li>Track Order</li>
          </ul>
        </div>
    
        {/* SOCIAL */}
        <div>
          <h3 className="font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <FaFacebookF className="hover:text-rose-500 cursor-pointer" />
            <FaInstagram className="hover:text-rose-500 cursor-pointer" />
            <FaTwitter className="hover:text-rose-500 cursor-pointer" />
            <FaLinkedinIn className="hover:text-rose-500 cursor-pointer" />
          </div>
        </div>
    
      </div>
    
      {/* BOTTOM FOOTER */}
      <div className="border-t border-gray-700 py-4 text-center text-gray-400 text-sm">
        © 2026 FASHION. All rights reserved.
      </div>
    
    </footer>
    
  )
}

export default Footer