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
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
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

// File Path: src/app.js (Backend)

// ... tumhaare baaki saare app.use() lines ke thik neeche aur module.exports se thik upar:

const protect = require("./middleware/auth.middleware");
const { getProfile } = require("./controllers/auth.controller");

// 🔥 GLOBAL ABSOLUTE FALLBACK ROUTE MESH:
// Agar koi bhi route file mismatch karegi, ye direct main port se data pipe karega
app.get("/api/auth/profile", protect, getProfile);

module.exports = app;