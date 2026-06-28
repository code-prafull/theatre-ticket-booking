const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Movie title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Movie description is required"],
    },

    genre: {
      type: [String],
      required: true,
    },

    language: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    releaseDate: {
      type: Date,
      required: true,
    },

    poster: {
      type: String,
      default: "",
    },

    trailer: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },

    cast: {
      type: [String],
      default: [],
    },

    director: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Now Showing", "Coming Soon"],
      default: "Coming Soon",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", movieSchema);