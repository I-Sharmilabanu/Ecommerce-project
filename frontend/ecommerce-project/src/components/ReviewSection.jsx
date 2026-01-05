import React from 'react'
import { FaStar } from "react-icons/fa";



const starContent = [
  {
    stars: 5,
    text: "Rated 5 stars for quality, delivery, and overall experience",
  },
  {
    stars: 5,
    text: "Trusted by thousands of shoppers for secure payments",
  },
  {
    stars: 5,
    text: "Top-rated platform for fashion and lifestyle products",
  },
];


function ReviewSection() {
  return (
    
    <section className="w-full bg-white py-16">
      <div className="w-full flex flex-col md:flex-row justify-evenly items-center gap-12 px-8">
    
        {starContent.map((item, index) => (
          <div
            key={index}
            className="text-center max-w-sm"
          >
            {/* STARS */}
            <div className="flex justify-center mb-4">
              {[...Array(item.stars)].map((_, i) => (
                <FaStar key={i} className="text-yellow-500 text-2xl mx-1" />
              ))}
            </div>
    
            {/* TEXT */}
            <p className="text-gray-700 text-sm md:text-base font-medium">
              {item.text}
            </p>
          </div>
        ))}
    
      </div>
    </section>
  )
}

export default ReviewSection