const mongoose = require("mongoose");

const showSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },

    theatre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theatre",
      required: true,
    },

    showDate: {
      type: Date,
      required: true,
    },

    showTime: {
      type: String,
      required: true,
    },

    ticketPrice: {
      type: Number,
      required: true,
    },

    totalSeats: {
      type: Number,
      default: 100,
    },

    bookedSeats: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Show", showSchema);