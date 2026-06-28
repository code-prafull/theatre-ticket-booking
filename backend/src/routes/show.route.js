const express = require("express");

const {
  createShow,
  getAllShows,
  getShowById,
  updateShow,
  deleteShow,
} = require("../controllers/show.controller");

const router = express.Router();

router.post("/", createShow);

router.get("/", getAllShows);

router.get("/:id", getShowById);

router.put("/:id", updateShow);

router.delete("/:id", deleteShow);

module.exports = router;