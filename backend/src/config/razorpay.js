// File Path: src/config/razorpay.js
const Razorpay = require("razorpay");
require("dotenv").config(); // Ensure env variables are loaded right here

// 🔥 SAFE INITIALIZATION MESH: Yahan apni real keys ka strict fallback daal rahe hain
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_T1vo1WAgcMir8I", // 👈 
  key_secret: process.env.RAZORPAY_KEY_SECRET || "t1cCngw3VBCksss73CLyohA0" // 👈 

})
module.exports = razorpayInstance;