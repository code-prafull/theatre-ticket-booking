const express = require("express");

const protect = require("../middleware/auth.middleware");

const {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/profile", protect, getProfile);

module.exports = router;