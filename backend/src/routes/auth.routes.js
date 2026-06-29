// File Path: routes/auth.routes.js
const express = require("express");
const router = express.Router();

// 🔥 FIXED DESTUCTURING: Mapping the exact naming schema from your live auth.controller.js
const {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
  getWishlist,
  toggleWishlist,
} = require("../controllers/auth.controller");

const protect = require("../middleware/auth.middleware");

// 🔓 Public Entrances Gateway Layer
router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔐 Guarded Active System Nodes (Maps directly to: /api/auth/profile)
router.get("/profile", protect, getProfile);

// ⭐ Wishlist endpoints
router.get("/wishlist", protect, getWishlist);
router.post("/wishlist", protect, toggleWishlist);

// 🚪 Session Termination Endpoint
router.post("/logout", logoutUser);

module.exports = router;