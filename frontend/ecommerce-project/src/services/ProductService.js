import axios from "axios";
import API_BASE_URL from "../config/api";

const PRODUCT_API = `${API_BASE_URL}/api/products`;

export const getAllProducts = async () => {
  try {
    const response = await axios.get(PRODUCT_API);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${PRODUCT_API}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    throw error;
  }
};
