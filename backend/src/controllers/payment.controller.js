// File Path: src/controllers/payment.controller.js
const Booking = require("../models/booking.model");

// 🔥 DUMMY SMART PIPELINE - NO MORE RAZORPAY SERVER DEPENDENCY CRASH
const createOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking parameters not found",
      });
    }

    // Direct local mock structure response pass kar rahe hain safely
    res.status(200).json({
      success: true,
      order: {
        id: "mock_order_id_" + Math.random().toString(36).substr(2, 9),
        amount: booking.totalAmount * 100,
        currency: "INR"
      },
      key: "rzp_test_dummy_bypass_matrix_node", 
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { bookingId } = req.body;

    // Direct database validation state ko "Paid" mark karo
    await Booking.findByIdAndUpdate(
      bookingId,
      {
        paymentStatus: "Paid",
      }
    );

    res.status(200).json({
      success: true,
      message: "Dummy Secure Payment Successful 🚀",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
};