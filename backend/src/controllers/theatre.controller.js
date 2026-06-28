const Theatre = require("../models/theatre.model");

// Create Theatre
const createTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.create(req.body);

    res.status(201).json({
      success: true,
      message: "Theatre created successfully",
      data: theatre,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Theatres
const getAllTheatres = async (req, res) => {
  try {
    const theatres = await Theatre.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: theatres.length,
      data: theatres,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Theatre By ID
const getTheatreById = async (req, res) => {
  try {
    const theatre = await Theatre.findById(req.params.id);

    if (!theatre) {
      return res.status(404).json({
        success: false,
        message: "Theatre not found",
      });
    }

    res.status(200).json({
      success: true,
      data: theatre,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Theatre
const updateTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!theatre) {
      return res.status(404).json({
        success: false,
        message: "Theatre not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Theatre updated successfully",
      data: theatre,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Theatre
const deleteTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.findByIdAndDelete(req.params.id);

    if (!theatre) {
      return res.status(404).json({
        success: false,
        message: "Theatre not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Theatre deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTheatre,
  getAllTheatres,
  getTheatreById,
  updateTheatre,
  deleteTheatre,
};