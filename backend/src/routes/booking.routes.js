const express = require("express");

const protect = require("../middleware/auth.middleware");

const {
  createBooking,
  getMyBookings,
  getBookingById,
} = require("../controllers/booking.controller");

const router = express.Router();

router.post("/", protect, createBooking);

router.get("/my-bookings", protect, getMyBookings);

router.get("/:id", protect, getBookingById);

module.exports = router;