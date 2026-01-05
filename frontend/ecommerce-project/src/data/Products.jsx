import kid1 from "../assets/image/kid1.jpg";
import kid2 from "../assets/image/kid2.jpg";
import kid3 from "../assets/image/kid3.jpg";
import kid4 from "../assets/image/kid4.jpg";
import kid5 from "../assets/image/kid5.jpg";

import men1 from "../assets/image/men1.jpg";
import men2 from "../assets/image/men2.jpg";
import men3 from "../assets/image/men3.jpg";
import men4 from "../assets/image/men4.jpg";
import men5 from "../assets/image/men5.jpg";

import skin1 from "../assets/image/skin1.jpg";
import skin2 from "../assets/image/skin2.jpg";
import skin3 from "../assets/image/skin3.jpg";
import skin4 from "../assets/image/skin4.jpg";
import skin5 from "../assets/image/skin5.jpg";

import women1 from "../assets/image/women1.jpg";
import women2 from "../assets/image/women2.jpg";
import women3 from "../assets/image/women3.jpg";
import women4 from "../assets/image/women4.jpg";
import women5 from "../assets/image/women5.jpg";

export const Products = [
  {
    id: 1,
    title: "Men Casual Shirt",
    price: 799,
    category: "men",
    image: men1,
    description: "Comfortable casual shirt made of 100% cotton, perfect for daily wear.",
    colors: ["Red", "Blue", "Green"],
    sizes: ["S", "M", "L", "XL"],
    returnPolicy: "Return within 7 days in original condition.",
    clothDetails: "100% Cotton, Machine washable",
    additionalImages: [men1, men2]
  },
  {
    id: 2,
    title: "Men Denim Jeans",
    price: 1299,
    category: "men",
    image: men2,
    description: "Stylish denim jeans with a slim fit, made from premium denim.",
    colors: ["Blue", "Black"],
    sizes: ["30", "32", "34", "36"],
    returnPolicy: "Return within 7 days in original condition.",
    clothDetails: "Denim, Machine washable",
    additionalImages: [men2, men3]
  },
  {
    id: 3,
    title: "Women Kurti",
    price: 999,
    category: "women",
    image: men3,
    description: "Elegant cotton kurti with embroidered details, comfortable and stylish.",
    colors: ["Red", "Yellow", "Green"],
    sizes: ["S", "M", "L", "XL"],
    returnPolicy: "Return within 7 days in original condition.",
    clothDetails: "Cotton, Hand wash recommended",
    additionalImages: [men3, women1]
  },
  {
    id: 4,
    title: "Kids T-Shirt",
    price: 499,
    category: "kids",
    image: men4,
    description: "Soft and colorful T-shirt for kids, perfect for daily wear.",
    colors: ["Blue", "Pink", "Yellow"],
    sizes: ["2-3Y", "3-4Y", "4-5Y"],
    returnPolicy: "Return within 7 days in original condition.",
    clothDetails: "100% Cotton, Machine washable",
    additionalImages: [men4, kid1]
  },
  {
    id: 5,
    title: "Leather Hand Bag",
    price: 1599,
    category: "accessories",
    image: men5,
    description: "Premium leather handbag, stylish and durable, perfect for daily use.",
    colors: ["Black", "Brown", "Tan"],
    sizes: ["One Size"],
    returnPolicy: "Return within 7 days in original condition.",
    clothDetails: "Genuine Leather",
    additionalImages: [men5, women2]
  },
  {
    id: 6,
    title: "Women Kurti",
    price: 999,
    category: "women",
    image: kid1,
    description: "Beautiful printed kurti made from soft cotton fabric, perfect for casual wear.",
    colors: ["Pink", "Blue", "White"],
    sizes: ["S", "M", "L", "XL"],
    returnPolicy: "Return within 7 days in original condition.",
    clothDetails: "Cotton, Hand wash recommended",
    additionalImages: [kid1, women3]
  },
  {
    id: 7,
    title: "Kids T-Shirt",
    price: 499,
    category: "kids",
    image: kid2,
    description: "Colorful T-shirt for kids, soft and comfortable for all-day wear.",
    colors: ["Red", "Yellow", "Green"],
    sizes: ["2-3Y", "3-4Y", "4-5Y"],
    returnPolicy: "Return within 7 days in original condition.",
    clothDetails: "100% Cotton",
    additionalImages: [kid2, kid3]
  },
  {
    id: 8,
    title: "Leather Hand Bag",
    price: 1599,
    category: "accessories",
    image: kid3,
    description: "Stylish leather handbag with spacious compartments.",
    colors: ["Black", "Brown"],
    sizes: ["One Size"],
    returnPolicy: "Return within 7 days in original condition.",
    clothDetails: "Genuine Leather",
    additionalImages: [kid3, kid4]
  },
  {
    id: 9,
    title: "Women Kurti",
    price: 999,
    category: "women",
    image: kid4,
    description: "Comfortable cotton kurti with floral prints, ideal for casual outings.",
    colors: ["Green", "Blue", "Pink"],
    sizes: ["S", "M", "L", "XL"],
    returnPolicy: "Return within 7 days in original condition.",
    clothDetails: "Cotton, Machine washable",
    additionalImages: [kid4, women4]
  },
  {
    id: 10,
    title: "Kids T-Shirt",
    price: 499,
    category: "kids",
    image: kid5,
    description: "Bright and soft T-shirt for kids, perfect for daily play.",
    colors: ["Blue", "Red", "Yellow"],
    sizes: ["2-3Y", "3-4Y", "4-5Y"],
    returnPolicy: "Return within 7 days in original condition.",
    clothDetails: "100% Cotton",
    additionalImages: [kid5, kid1]
  },
  {
    id: 11,
    title: "Leather Hand Bag",
    price: 1599,
    category: "accessories",
    image: skin1,
    description: "Premium leather handbag with elegant finish.",
    colors: ["Black", "Brown"],
    sizes: ["One Size"],
    returnPolicy: "Return within 7 days in original condition.",
    clothDetails: "Genuine Leather",
    additionalImages: [skin1, skin2]
  },
  {
    id: 12,
    title: "Women Kurti",
    price: 999,
    category: "women",
    image: skin2,
    description: "Printed cotton kurti, lightweight and comfortable.",
    colors: ["Red", "Blue", "Green"],
    sizes: ["S", "M", "L", "XL"],
    returnPolicy: "Return within 7 days in original condition.",
    clothDetails: "Cotton",
    additionalImages: [skin2, women1]
  },
  {
    id: 13,
    title: "Kids T-Shirt",
    price: 499,
    category: "kids",
    image: skin3,
    description: "Soft T-shirt with fun prints for kids.",
    colors: ["Pink", "Blue", "Yellow"],
    sizes: ["2-3Y", "3-4Y", "4-5Y"],
    returnPolicy: "Return within 7 days in original condition.",
    clothDetails: "100% Cotton",
    additionalImages: [skin3, kid1]
  },
  {
    id: 14,
    title: "Leather Hand Bag",
    price: 1599,
    category: "accessories",
    image: skin4,
    description: "Stylish leather handbag with zipper closure.",
    colors: ["Black", "Brown"],
    sizes: ["One Size"],
    returnPolicy: "Return within 7 days in original condition.",
    clothDetails: "Genuine Leather",
    additionalImages: [skin4, skin5]
  },
  {
    id: 15,
    title: "Leather Hand Bag",
    price: 1599,
    category: "accessories",
    image: skin5,
    description: "Elegant handbag with premium leather finish.",
    colors: ["Black", "Tan"],
    sizes: ["One Size"],
    returnPolicy: "Return within 7 days in original condition.",
    clothDetails: "Genuine Leather",
    additionalImages: [skin5, women2]
  },
  {
    id: 16,
    title: "Leather Hand Bag",
    price: 1599,
    category: "accessories",
    image: women1,
    description: "Spacious leather handbag, ideal for daily use.",
    colors: ["Black", "Brown"],
    sizes: ["One Size"],
    returnPolicy: "Return within 7 days in original condition.",
    clothDetails: "Genuine Leather",
    additionalImages: [women1, women3]
  },
  {
    id: 17,
    title: "Leather Hand Bag",
    price: 1599,
    category: "accessories",
    image: women2,
    description: "Elegant handbag with multiple compartments.",
    colors: ["Black", "Brown"],
    sizes: ["One Size"],
    returnPolicy: "Return within 7 days in original condition.",
    clothDetails: "Genuine Leather",
    additionalImages: [women2, women4]
  },
  {
    id: 18,
    title: "Leather Hand Bag",
    price: 1599,
    category: "accessories",
    image: women3,
    description: "Premium leather handbag, stylish and durable.",
    colors: ["Black", "Brown"],
    sizes: ["One Size"],
    returnPolicy: "Return within 7 days in original condition.",
    clothDetails: "Genuine Leather",
    additionalImages: [women3, women5]
  },
  {
    id: 19,
    title: "Leather Hand Bag",
    price: 1599,
    category: "accessories",
    image: women4,
    description: "Stylish handbag with elegant finish, ideal for daily use.",
    colors: ["Black", "Tan"],
    sizes: ["One Size"],
    returnPolicy: "Return within 7 days in original condition.",
    clothDetails: "Genuine Leather",
    additionalImages: [women4, women1]
  },
  {
    id: 20,
    title: "Leather Hand Bag",
    price: 1599,
    category: "accessories",
    image: women5,
    description: "Premium leather handbag, perfect for all occasions.",
    colors: ["Black", "Brown", "Tan"],
    sizes: ["One Size"],
    returnPolicy: "Return within 7 days in original condition.",
    clothDetails: "Genuine Leather",
    additionalImages: [women5, women2]
  }
];


