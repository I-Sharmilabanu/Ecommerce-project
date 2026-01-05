import axios from "axios";

// Backend base URL
const API_URL = "http://localhost:5000/api/products";

// Get all products
export const getAllProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get single product by ID
export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
