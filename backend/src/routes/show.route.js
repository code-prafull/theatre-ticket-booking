const express = require("express");

const {
  createShow,
  getAllShows,
} = require("../controllers/show.controller");

const router = express.Router();

router.post("/", createShow);

router.get("/", getAllShows);

module.exports = router;