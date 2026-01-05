import React from 'react'

import { FaTruck, FaLock, FaUndo, FaHeadset } from "react-icons/fa";



const trustData = [
  {
    icon: <FaTruck />,
    title: "Fast Delivery",
    desc: "Quick and reliable delivery to your doorstep",
  },
  {
    icon: <FaLock />,
    title: "Secure Payment",
    desc: "100% secure and encrypted transactions",
  },
  {
    icon: <FaUndo />,
    title: "Easy Returns",
    desc: "Hassle-free returns within 7 days",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    desc: "We are here to help anytime you need",
  },
];

function TrustSection() {
  return (

<section className="mx-auto max-w-7xl bg-white py-14">
      <div className="grid  grid-cols-4 md:grid-cols-4 gap-10 px-6 text-center">

        {trustData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-4"
          >
            <div className="text-4xl text-rose-600">
              {item.icon}
            </div>

            <h3 className="font-semibold text-lg">
              {item.title}
            </h3>

            <p className="text-gray-600 text-sm">
              {item.desc}
            </p>
          </div>
        ))}

      </div>
    </section>
  )
}

export default TrustSection