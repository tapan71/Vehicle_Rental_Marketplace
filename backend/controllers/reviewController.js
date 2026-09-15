const Review = require('../models/Review');
const Booking = require('../models/Booking');

// Submit a review (only after booking is completed/returned)
exports.submitReview = async (req, res) => {
  try {
    const { bookingId, vehicleId, rating, comment } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.status !== 'returned') {
      return res.status(400).json({ message: "You can only review a completed booking" });
    }

    const review = await Review.create({ bookingId, vehicleId, rating, comment });
    res.status(201).json({ message: "Review submitted successfully", review });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all reviews for a specific vehicle
exports.getReviewsByVehicle = async (req, res) => {
  try {
    const reviews = await Review.find({ vehicleId: req.params.vehicleId })
      .populate('bookingId');

    const avgRating = reviews.length
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

    res.status(200).json({ reviews, averageRating: avgRating });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a review (optional — if you allow editing)
exports.updateReview = async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedReview) return res.status(404).json({ message: "Review not found" });
    res.status(200).json(updatedReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a review (optional — admin moderation)
exports.deleteReview = async (req, res) => {
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Review not found" });
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};