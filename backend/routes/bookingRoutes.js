const express = require("express");

const router = express.Router();

const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  cancelBooking
} = require("../controllers/bookingController");

// CREATE BOOKING
const { protect } = require("../middleware/authMiddleware");
router.post("/", protect, createBooking);

// GET ALL BOOKINGS
router.get("/", getAllBookings);

// GET BOOKING BY ID
router.get("/:id", getBookingById);

// UPDATE BOOKING
router.put("/:id", updateBooking);

// CANCEL BOOKING
router.patch("/:id/cancel", cancelBooking);

module.exports = router;