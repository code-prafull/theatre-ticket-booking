import API from "./axios";

export const fetchWishlist = () => API.get("/auth/wishlist");

export const toggleWishlist = (movieId) =>
  API.post("/auth/wishlist", { movieId });

