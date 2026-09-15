const Booking = require("../models/Booking");
const User = require("../models/User");
const Vehicle = require("../models/Vehicle");

// CREATE BOOKING
const createBooking = async (req, res) => {
  try {
    const {
      bookingid,
      userid,
      vehicleid,
      startDate,
      endDate,
      totalAmount
    } = req.body;

    // Check required fields
    if (
      !bookingid ||
      !userid ||
      !vehicleid ||
      !startDate ||
      !endDate ||
      !totalAmount
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Check duplicate booking ID
    const existingBooking = await Booking.findOne({ bookingid });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "Booking already exists"
      });
    }

    // Check user
    const user = await User.findById(userid);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check vehicle
    const vehicle = await Vehicle.findById(vehicleid);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found"
      });
    }

    // Check date validity
    if (new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date"
      });
    }

    // Check vehicle availability
    if (vehicle.status !== "available") {
      return res.status(400).json({
        success: false,
        message: "Vehicle is not available"
      });
    }

    // Create booking
    const booking = await Booking.create({
      bookingid,
      userid,
      vehicleid,
      startDate,
      endDate,
      totalAmount,
      status: "pending"
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking
    });

  } catch (error) {
    console.error("Create Booking Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};


// GET ALL BOOKINGS
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userid")
      .populate("vehicleid");

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });

  } catch (error) {
    console.error("Get Bookings Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};


// GET BOOKING BY ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("userid")
      .populate("vehicleid");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    res.status(200).json({
      success: true,
      booking
    });

  } catch (error) {
    console.error("Get Booking Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};


// UPDATE BOOKING
const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      booking
    });

  } catch (error) {
    console.error("Update Booking Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};


// CANCEL BOOKING
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status: "cancelled"
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      booking
    });

  } catch (error) {
    console.error("Cancel Booking Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};


module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  cancelBooking
};