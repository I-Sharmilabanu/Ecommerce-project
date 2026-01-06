import axios from "axios";
import API_BASE_URL from "../config/api";

// Products API base
const PRODUCT_API = `${API_BASE_URL}/api/products`;

// Get all products
export const getAllProducts = async () => {
  const response = await axios.get(PRODUCT_API);
  return response.data;
};

// Get single product by ID
export const getProductById = async (id) => {
  const response = await axios.get(`${PRODUCT_API}/${id}`);
  return response.data;
};
