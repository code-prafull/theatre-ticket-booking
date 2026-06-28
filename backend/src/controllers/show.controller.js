const Show = require("../models/show.model");

// Create Show
const createShow = async (req, res) => {
  try {
    const show = await Show.create(req.body);

    res.status(201).json({
      success: true,
      message: "Show created successfully",
      data: show,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Shows
const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find()
      .populate("movie")
      .populate("theatre");

    res.status(200).json({
      success: true,
      count: shows.length,
      data: shows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createShow,
  getAllShows,
};