// File Path: src/config/razorpay.js
const Razorpay = require("razorpay");
require("dotenv").config(); // Ensure env variables are loaded right here

// 🔥 SAFE INITIALIZATION MESH: Provides a strict fallback string if env is missing
// This prevents the SDK from throwing a fatal crash error on startup
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_mockKeyId12345", 
  key_secret: process.env.RAZORPAY_KEY_SECRET || "mockSecretKey54321"
});

module.exports = razorpayInstance;