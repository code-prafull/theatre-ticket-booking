import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MovieDetails from "../pages/MovieDetails";
import TheatreSelection from "../pages/TheatreSelection";
import ShowSelection from "../pages/ShowSelection";
import SeatSelection from "../pages/SeatSelection";
import Checkout from "../pages/Checkout";
import Payment from "../pages/Payment";
import MyBooking from "../pages/MyBooking";

// Admin
import Dashboard from "../pages/admin/Dashboard";
import Movies from "../pages/admin/Movies";
import Theatres from "../pages/admin/Theatres";
import Show from "../pages/admin/Show";
import Booking from "../pages/admin/Booking";
import ProtectedRoute from "../components/shared/ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/movies/:id" element={<MovieDetails />} />

        <Route
          path="/theatres/:movieId"
          element={<TheatreSelection />}
        />

        <Route
          path="/shows/:movieId/:theatreId"
          element={<ShowSelection />}
        />

        <Route
  path="/seats/:showId"
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
  path="/my-bookings"
  element={
    <ProtectedRoute>
      <MyBooking />
    </ProtectedRoute>
  }
/>

        {/* Admin Routes */}

        <Route
  path="/admin"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/movies"
  element={
    <ProtectedRoute>
      
        <Movies />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/theatres"
  element={
    <ProtectedRoute>
      <Theatres />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/shows"
  element={
    <ProtectedRoute>
      <Show />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/bookings"
  element={
    <ProtectedRoute>
      <Booking />
    </ProtectedRoute>
  }
/>
        {/* 404 */}

        <Route
          path="*"
          element={
            <h1 className="text-center mt-20 text-4xl">
              404 Page Not Found
            </h1>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;