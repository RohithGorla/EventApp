const express = require("express");
const Event = require("../models/Event");
const router = express.Router();

router.get("/", async (req, res) => {
  const { search, category, location } = req.query;
  let query = {};

  if (search) query.name = { $regex: search, $options: "i" };
  if (category) query.category = category;
  if (location) query.location = location;

  const events = await Event.find(query);
  res.json(events);
});

module.exports = router;