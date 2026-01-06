// src/config/api.js

const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : import.meta.env.VITE_BACKEND_URL;

export default API_BASE_URL;
