const transporter = require("../config/mail");

const sendBookingMail = async (user, booking, show) => {
  await transporter.sendMail({

  
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "🎬 Movie Ticket Booking Confirmation",

    html: `
      <div style="font-family:Arial;padding:20px">

      <h2>Booking Confirmed 🎉</h2>

      <p>Hello <b>${user.name}</b>,</p>

      <p>Your ticket has been booked successfully.</p>

      <hr>

      <h3>Ticket Details</h3>

      <p><b>Movie :</b> ${show.movie.title}</p>

      <p><b>Theatre :</b> ${show.theatre.name}</p>

      <p><b>Date :</b> ${new Date(show.showDate).toDateString()}</p>

      <p><b>Time :</b> ${show.showTime}</p>

      <p><b>Seats :</b> ${booking.seats.join(", ")}</p>

      <p><b>Total :</b> ₹${booking.totalAmount}</p>

      <hr>

      <h2>Enjoy your Movie 🍿</h2>

      </div>
    `,
  });
};

module.exports = sendBookingMail;