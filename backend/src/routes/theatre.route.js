const express = require("express");

const {
  createTheatre,
  getAllTheatres,
  getTheatreById,
  updateTheatre,
  deleteTheatre,
} = require("../controllers/theatre.controller");

const router = express.Router();

router.post("/", createTheatre);

router.get("/", getAllTheatres);

router.get("/:id", getTheatreById);

router.put("/:id", updateTheatre);

router.delete("/:id", deleteTheatre);

module.exports = router;