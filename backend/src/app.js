// File Path: src/app.js (Backend)
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const movieRoutes = require("./routes/movie.routes");
const theatreRoutes = require("./routes/theatre.route");
const showRoutes = require("./routes/show.route");
const bookingRoutes = require("./routes/booking.routes");
const paymentRoutes = require("./routes/payment.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 🔥 FOOLPROOF ABSOLUTE PRODUCTION CORS MATRIX
const allowedOrigins = [
  "http://localhost:5173",                             // Local Testing Frontend
  "https://theatre-ticket-booking-iz2x.vercel.app",   // Teri exact live frontend link (Bina slash ke)
  "https://theatre-ticket-booking.vercel.app",        // Main production frontend URL
  process.env.FRONTEND_URL                             // Backup dynamic layer
];

app.use(cors({
  origin: function (origin, callback) {
    // Agar local call hai, postman hai, ya allowedOrigins mein se koi bhi match ho jaye
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("CORS Blocked for Origin:", origin);
      callback(new Error("CORS Policy Block: Access Denied for this Origin!"));
    }
  },
  credentials: true // Cookies aur token transmission ke liye mandatory hai
}));

app.use(helmet({
  crossOriginResourcePolicy: false, // Static images ya resources block na hon isliye safety layer
}));
app.use(compression());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "API Running Clean 🚀" });
});

// Saare routing models map hain
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/theatres", theatreRoutes);
app.use("/api/shows", showRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);

const protect = require("./middleware/auth.middleware");
const { getProfile } = require("./controllers/auth.controller");

// 🔥 GLOBAL ABSOLUTE FALLBACK ROUTE MESH:
app.get("/api/auth/profile", protect, getProfile);

module.exports = app;