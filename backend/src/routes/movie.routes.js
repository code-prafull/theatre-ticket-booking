const express = require("express");

const {
 createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
} = require("../controllers/movie.controller");

const router = express.Router();

router.post("/", createMovie);

router.get("/", getAllMovies);

router.get("/:id", getMovieById);

router.put("/:id", updateMovie);

module.exports = router;