import React, { useState } from "react";


import { Link } from "react-router-dom";

import { GoDot, GoDotFill } from "react-icons/go";

function Herovideo() {
  const [currentVideo, setCurrentVideo] = useState(0);

  const videos = [
    { id: 0, url: "https://res.cloudinary.com/da22f8zk9/video/upload/v1767631944/5121797_Person_Human_3840x2160_hichog.mp4" },
    { id: 1, url: "https://res.cloudinary.com/da22f8zk9/video/upload/v1767622490/1474396_People_Nature_3840x2160_bndy5b.mp4" },
    { id: 2, url: "https://res.cloudinary.com/da22f8zk9/video/upload/v1767632429/0_Women_Girls_3840x2160_il75l3.mp4" },
    { id: 3, url: "https://res.cloudinary.com/da22f8zk9/video/upload/v1767632512/4931852_Person_People_3840x2160_xbgnes.mp4"},
    { id: 4, url: "https://res.cloudinary.com/da22f8zk9/video/upload/v1767632429/0_Women_Girls_3840x2160_il75l3.mp4"}
  ];

 

  return (
    <section className="relative w-full h-96 mt-24 overflow-hidden">
      {/* VIDEO */}
      <video
        key={currentVideo}
        className="absolute inset-0 w-full h-full object-cover"
        src={videos[currentVideo].url}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* LEFT ARROW */}
     

      {/* DOT INDICATORS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {videos.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setCurrentVideo(index)}
            className="cursor-pointer"
          >
            {index === currentVideo ? (
              <GoDotFill size={26} className="text-white" />
            ) : (
              <GoDot size={26} className="text-white" />
            )}
          </button>
        ))}
      </div>

      {/* TEXT CONTENT */}
      <div className="relative z-10 flex flex-col justify-center h-full px-10 md:px-40">
        <h1 className="text-yellow-400 text-4xl md:text-6xl font-extrabold mb-6">
          Best deals. Best style. Best price
        </h1>

        <Link to="/product">
          <button className="w-44 bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition">
            Shop Now →
          </button>
        </Link>
      </div>
    </section>
  );
}

export default Herovideo;
