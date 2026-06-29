const crypto = require("crypto");

const razorpay = require("../config/razorpay");
const Booking = require("../models/booking.model");

const createOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const options = {
      amount: booking.totalAmount * 100,
      currency: "INR",
      receipt: booking._id.toString(),
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID || "rzp_test_mockKeyId12345",
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
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
    } = req.body;

    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const razorpaySecret =
      process.env.RAZORPAY_KEY_SECRET || "mockSecretKey54321";

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        razorpaySecret
      )
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment Verification Failed",
      });
    }

    await Booking.findByIdAndUpdate(
      bookingId,
      {
        paymentStatus: "Paid",
      }
    );

    res.status(200).json({
      success: true,
      message: "Payment Successful",
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