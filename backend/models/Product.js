const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    image: {
      type: String, // ✅ Cloudinary URL
      required: true,
    },

    additionalImages: [
      {
        type: String, // ✅ Cloudinary URLs
      },
    ],

    description: {
      type: String,
    },

    colors: [
      {
        type: String,
      },
    ],

    sizes: [
      {
        type: String,
      },
    ],

    returnPolicy: {
      type: String,
    },

    clothDetails: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
