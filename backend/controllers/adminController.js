const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');

// Get all users (consumers + owners)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Block / unblock a user
exports.updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body; // e.g. "active" or "blocked"
    const user = await User.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User status updated", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Approve or reject a consumer's uploaded license
exports.updateLicenseStatus = async (req, res) => {
  try {
    const { status } = req.body; // "verified" or "rejected"
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { "license.status": status },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "License status updated", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all vehicle listings (for approval/moderation)
exports.getAllVehiclesForAdmin = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate('ownerId', 'name email phone');
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Approve or reject a vehicle listing
exports.updateVehicleApproval = async (req, res) => {
  try {
    const { status } = req.body; // "active" or "rejected"
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.status(200).json({ message: "Vehicle status updated", vehicle });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// View all bookings (for dispute resolution / oversight)
exports.getAllBookingsForAdmin = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('vehicleId')
      .populate('consumerId', 'name email phone');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Force-update a booking status (dispute resolution)
exports.forceUpdateBooking = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking force-updated by admin", booking });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Platform analytics summary
exports.getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalVehicles = await Vehicle.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const completedBookings = await Booking.find({ status: 'returned' });
    const mockRevenue = completedBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

    res.status(200).json({
      totalUsers,
      totalVehicles,
      totalBookings,
      mockRevenue
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};