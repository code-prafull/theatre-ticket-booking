const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");


// routes
const routes = require("./routes");
const authRoutes = require("./routes/auth.routes");
const movieRoutes = require("./routes/movie.routes");
const theatreRoutes = require("./routes/theatre.route");
const showRoutes = require("./routes/show.route");
const bookingRoutes = require("./routes/booking.routes");
const paymentRoutes = require("./routes/payment.routes");


const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

// Health Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Movie Ticket Booking API Running 🚀",
  });
});



app.use("/api", routes);



app.use("/api/auth", authRoutes);

app.use("/api/movies", movieRoutes);

app.use("/api/theatres", theatreRoutes);

app.use("/api/shows", showRoutes);

app.use("/api/bookings", bookingRoutes);


app.use("/api/payments", paymentRoutes);





module.exports = app;