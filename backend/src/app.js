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

// 🔥 PRODUCTION-READY DYNAMIC CORS HANDSHAKE MATRIX
const allowedOrigins = [
  "http://localhost:5173",   // Local testing frontend ke liye
  process.env.FRONTEND_URL   // Live Vercel Frontend Link (Render ke dashboard se automatic uthayega)
];

app.use(cors({
  origin: function (origin, callback) {
    // Agar request bina origin ke hai (jaise Postman) ya allowed list me hai, toh access allow karo
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS Policy Block: Access Denied for this Origin!"));
    }
  },
  credentials: true // Cookies aur token extraction handshake ke liye mandatory hai
}));

app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "API Running Clean 🚀" });
});

// Wapas saare routing models bina kisi strict checkpoint ke seedhe map hain
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