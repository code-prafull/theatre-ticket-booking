// File Path: src/controllers/booking.controller.js
const Booking = require("../models/booking.model");
const Show = require("../models/show.model");
const User = require("../models/user.model");
const sendBookingMail = require("../utils/sendBookingMail");

// 1. CREATE NEW BOOKING TRANSACTION LOG (BYPASS LAYER INTEGRATED)
const createBooking = async (req, res) => {
  try {
    console.log("🔥 BOOKING REQUEST RECEIVED:", {
      body: req.body,
      user: req.user?._id,
      headers: req.headers.authorization ? "Token Present" : "No Token"
    });

    const { showId, seats } = req.body;
    const userId = req.user._id;

    if (!showId || !seats || !Array.isArray(seats) || seats.length === 0) {
      console.log("❌ INVALID PAYLOAD:", { showId, seats });
      return res.status(400).json({
        success: false,
        message: "Invalid booking parameters: showId and seats are required",
      });
    }

    // Find Show
    const show = await Show.findById(showId);
    if (!show) {
      console.log("❌ SHOW NOT FOUND:", showId);
      return res.status(404).json({
        success: false,
        message: "Show parameters not found",
      });
    }

    // Check already booked seats
    const booked = seats.filter((seat) =>
      show.bookedSeats.includes(seat)
    );

    if (booked.length > 0) {
      console.log("❌ SEATS ALREADY BOOKED:", booked);
      return res.status(400).json({
        success: false,
        message: `Seats already booked: ${booked.join(", ")}`,
      });
    }

    // Total Amount Calculations
    const totalAmount = seats.length * show.ticketPrice;

    // Create Booking inside Database
    const booking = await Booking.create({
      user: userId,
      show: showId,
      seats,
      totalAmount,
    });

    console.log("✅ BOOKING CREATED:", booking._id);

    // Update Show seats layout tracking indices array
    show.bookedSeats.push(...seats);
    await show.save();

    // 🔥 SAFE EMAIL BYPASS: Email fail hone par backend crash NAI HOGA ab!
    try {
      const user = await User.findById(userId);
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await sendBookingMail(user, booking, show);
        console.log("✅ Booking confirmation email sent");
      } else {
        console.log("⚠️ Email variables missing, skipping mail send to prevent node crash.");
      }
    } catch (mailError) {
      console.log("❌ Email Service Handshake Error:", mailError.message);
    }

    // 🔥 NESTED GRAPH POPULATION (Safe production architecture mapping)
    const populatedBookingInstance = await Booking.findById(booking._id).populate({
      path: "show",
      populate: [
        { path: "movie" },
        { path: "theatre" },
      ],
    });

    console.log("✅ BOOKING POPULATED SUCCESSFULLY");

    // Success response pipe direct frontend ko navigation trigger dega
    res.status(201).json({
      success: true,
      message: "Booking Instance Created Successfully",
      data: populatedBookingInstance, 
    });

  } catch (error) {
    console.error("❌ CRITICAL BOOKING CRASH:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Booking Pipeline Rejection",
    });
  }
};

// 2. GET ALL MY BOOKINGS LIST
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate({
        path: "show",
        populate: [{ path: "movie" }, { path: "theatre" }],
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. LOOKUP SPECIFIC TICKET SUMMARY RECORD BY ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate({
        path: "show",
        populate: [{ path: "movie" }, { path: "theatre" }],
      })
      .populate("user", "name email");

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getBookingById,
};