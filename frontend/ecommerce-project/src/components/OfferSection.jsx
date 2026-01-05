import React from 'react'
import offerImg from "../assets/image/blackfriday-celebration-marketing.jpg"; 
import { Link } from 'react-router-dom';


function OfferSection() {
  return (

    <section className="relative w-[100%] left-0 h-[450px] mt-20 overflow-hidden">
  
  {/* BACKGROUND IMAGE */}
  <img
    src={offerImg}
    alt="Special Offer"
    className="w-full h-full object-cover"
  />

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* CONTENT */}
  <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-24 text-white">
    
    <h2 className="text-4xl md:text-6xl font-extrabold mb-4 animate-pulse text-yellow-500">
      Mega Sale
    </h2>

    <p className="text-lg md:text-xl mb-6 max-w-xl animate-fade-in">
      Flat 50% OFF on latest fashion collections.
      Limited time only — don’t miss out!
    </p>
        <Link to="/product">
    <button className="bg-rose-600 hover:bg-rose-700 transition-all duration-300 px-8 py-3 rounded-lg font-semibold animate-bounce">
      Shop Now →
    </button></Link>

  </div>
</section>
  )
}

export default OfferSection