// File Path: routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";

// Core Consumer Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MovieDetails from "../pages/MovieDetails";
import TheatreSelection from "../pages/TheatreSelection";
import ShowSelection from "../pages/ShowSelection";
import SeatSelection from "../pages/SeatSelection";
import Checkout from "../pages/Checkout";
import Payment from "../pages/Payment";
import Profile from "../pages/Profile";
import MyBooking from "../pages/MyBooking";
import Wishlist from "../pages/Wishlist";
import ProtectedRoute from "../components/shared/ProtectedRoute";
import Ticket from "../pages/Ticket";


import AdminRoute from "../components/shared/AdminRoute";
import Dashboard from "../pages/admin/Dashboard";
import Movies from "../pages/admin/Movies";
import Theatres from "../pages/admin/Theatres";
import Show from "../pages/admin/Show";
import Booking from "../pages/admin/Booking";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Saare routes bina kisi barrier ke, seedhe render honge */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      
      <Route
        path="/theatre-selection"
        element={
          <ProtectedRoute>
            <TheatreSelection />
          </ProtectedRoute>
        }
      />
      <Route path="/show-selection" element={<ShowSelection />} />
      <Route
        path="/seat-selection/:showId"
        element={
          <ProtectedRoute>
            <SeatSelection />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-bookings"
        element={
          <ProtectedRoute>
            <MyBooking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ticket/:id"
        element={
          <ProtectedRoute>
            <Ticket />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />

        <Route path="/admin" element={<AdminRoute />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="movies" element={<Movies />} />
        <Route path="theatres" element={<Theatres />} />
        <Route path="shows" element={<Show />} />
        <Route path="bookings" element={<Booking />} />
      </Route>



    </Routes>
  );
};

export default AppRoutes;