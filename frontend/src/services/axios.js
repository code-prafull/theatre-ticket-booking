// File Path: services/axios.js
import axios from "axios";

const API = axios.create({
  // 🔥 PRODUCTION-READY DYNAMIC BASE URL:
  // Vercel/Production par ye Render wali URL uthayega, aur local pc par localhost chalega!
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  timeout: 30000, // Increased to 30 seconds for production deployment
  withCredentials: true,
});

// Request Interceptor: Token Attach karne ke liye
API.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      // Tera exact normalization check jo strings ke quotes saaf karta hai
      const normalizedToken = token.replace(/^"|"$/g, "");
      config.headers.Authorization = `Bearer ${normalizedToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: 401 Error standard par Token clear karne ke liye
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      const message = error?.response?.data?.message || "";
      if (
        message.includes("token missing") ||
        message.includes("token invalid") ||
        message.includes("token expired")
      ) {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
      }
    }
    return Promise.reject(error);
  }
);

export default API;