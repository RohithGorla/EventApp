const express = require("express");
const Registration = require("../models/Registration");
const Event = require("../models/Event");
const protect = require("../middleware/protect");

const router = express.Router();

// Register
router.post("/:eventId", protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const alreadyRegistered = await Registration.findOne({
      user: req.user._id,
      event: event._id
    });

    if (alreadyRegistered) {
      return res.status(400).json({ message: "Already registered" });
    }

    const registrationCount = await Registration.countDocuments({
      event: event._id
    });

    if (registrationCount >= event.capacity) {
      return res.status(400).json({ message: "Event is full" });
    }

    await Registration.create({
      user: req.user._id,
      event: event._id
    });

    res.json({ message: "Successfully registered" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cancel Registration
router.delete("/:eventId", protect, async (req, res) => {
  try {
    const registration = await Registration.findOneAndDelete({
      user: req.user._id,
      event: req.params.eventId
    });

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.json({ message: "Registration cancelled" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Dashboard
router.get("/my-events", protect, async (req, res) => {
  try {
    const registrations = await Registration.find({
      user: req.user._id
    }).populate("event");

    res.json(registrations);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;