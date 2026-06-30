// File Path: src/controllers/booking.controller.js
const Booking = require("../models/booking.model");
const Show = require("../models/show.model");
const User = require("../models/user.model");
const sendBookingMail = require("../utils/sendBookingMail");

// 1. CREATE NEW BOOKING TRANSACTION LOG
const createBooking = async (req, res) => {
  try {
    const { showId, seats } = req.body;
    const userId = req.user._id;

    // Find Show
    const show = await Show.findById(showId);
    if (!show) {
      return res.status(404).json({
        success: false,
        message: "Show not found",
      });
    }

    // Check already booked seats
    const booked = seats.filter((seat) =>
      show.bookedSeats.includes(seat)
    );

    if (booked.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Seats already booked: ${booked.join(", ")}`,
      });
    }

    // Total Amount Calculations
    const totalAmount = seats.length * show.ticketPrice;

    // Create Booking
    const booking = await Booking.create({
      user: userId,
      show: showId,
      seats,
      totalAmount,
    });

    // Update Show seats layout tracking indices array
    show.bookedSeats.push(...seats);
    await show.save();

    // Send Confirmation Email safely
    try {
      const user = await User.findById(userId);
      await sendBookingMail(user, booking, show);
      console.log("✅ Booking confirmation email sent");
    } catch (mailError) {
      console.log("❌ Email Error:", mailError.message);
    }

    // 🔥 NESTED GRAPH POPULATION (This works 100% perfectly on production web layers)
    const populatedBookingInstance = await Booking.findById(booking._id).populate({
      path: "show",
      populate: [
        { path: "movie" },
        { path: "theatre" },
      ],
    });

    res.status(201).json({
      success: true,
      message: "Booking Successful",
      data: populatedBookingInstance, 
    });

  } catch (error) {
    console.error("Booking Controller Main Crash Log:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 2. GET ALL MY BOOKINGS LIST
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate({
        path: "show",
        populate: [
          { path: "movie" },
          { path: "theatre" },
        ],
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 3. LOOKUP SPECIFIC TICKET SUMMARY RECORD BY ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate({
        path: "show",
        populate: [
          { path: "movie" },
          { path: "theatre" },
        ],
      })
      .populate("user", "name email");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getBookingById,
};