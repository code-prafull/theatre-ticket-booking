import API from "./axios";

export const createBooking = (data) =>
  API.post("/bookings", data);

export const getMyBookings = () =>
  API.get("/bookings/my-bookings");

export const getBookingById = (id) =>
  API.get(`/bookings/${id}`);