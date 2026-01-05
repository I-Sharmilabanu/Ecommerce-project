import React from 'react'

const fashionData = [
  {
    img: "data:image/jpeg;base64,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",
    title: "Women's",
    desc: "Trendy styles for modern women",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4o0lDBP716A6VLZu6F8JpCwaE8XPsCLPmdg&s",
    title: "Men's",
    desc: "Classic & casual collections",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYaPCAAPbXorIAecJ-vwhunrx18xmKdU67zA&s",
    title: "Kids ",
    desc: "Comfortable & cute outfits",
  },
  
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkWBwKUaGm4FcxXpaVSVtVEtuaoHj6t0mudg&s",
    title: "Footwear",
    desc: "Walk with confidence",
  },
];

function FashionGrid() {
  return (
 <section className="w-full bg-slate-300 py-12 mt-12">
  <div className="grid grid-cols-2  md:grid-cols-4 gap-6 px-6">

    {fashionData.map((item, index) => (
      <div
        key={index}
        className="bg-white rounded-lg shadow-md overflow-hidden text-center"
      >
        {/* IMAGE */}
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-32 object-cover"
        />

        {/* CONTENT BELOW IMAGE */}
        <div className="p-4">
          <h3 className="font-semibold text-lg">{item.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
        </div>
      </div>
    ))}

  </div>
</section>
  )
}

export default FashionGrid