// File Path: services/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      const normalizedToken = token.replace(/^"|"$/g, "");
      config.headers.Authorization = `Bearer ${normalizedToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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