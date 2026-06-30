// File Path: src/services/paymentApi.js
import API from "./axios";

export const createOrder = (bookingId) => {
  return API.post("/payments/create-order", { bookingId });
};

export const verifyPayment = (paymentData) => {
  return API.post("/payments/verify", paymentData); // paymentData takes object structure directly
};