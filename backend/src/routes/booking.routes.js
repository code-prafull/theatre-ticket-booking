// File Path: src/routes/booking.routes.js
const express = require("express");
const router = express.Router();

// 1. Apka exact protect middleware
const protect = require("../middleware/auth.middleware");

// 2. 🔥 FIX: Destructured imports completely matching your booking.controller.js
const {
  createBooking,
  getMyBookings,
  getBookingById,
} = require("../controllers/booking.controller");

// Route Mappings
router.post("/", protect, createBooking);
router.get("/my-bookings", protect, getMyBookings);
router.get("/:id", protect, getBookingById);

// 🔥 Strict router instance export
module.exports = router;