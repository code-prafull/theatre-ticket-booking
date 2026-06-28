const express = require("express");

const {
 createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie
} = require("../controllers/movie.controller");

const router = express.Router();

router.post("/", createMovie);

router.get("/", getAllMovies);

router.get("/:id", getMovieById);

router.put("/:id", updateMovie);

router.delete("/:id", deleteMovie);

module.exports = router;