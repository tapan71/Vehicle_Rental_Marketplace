const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

// Process a mock payment for a booking
exports.processPayment = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Simulate payment success (mock — no real gateway)
    const payment = await Payment.create({
      bookingId,
      amount: booking.totalAmount,
      paymentStatus: 'mock_paid',
      paymentDate: new Date()
    });

    // Update booking's payment status too
    booking.paymentStatus = 'mock_paid';
    await booking.save();

    res.status(201).json({ message: "Payment Successful", payment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get payment details by booking ID
exports.getPaymentByBooking = async (req, res) => {
  try {
    const payment = await Payment.findOne({ bookingId: req.params.bookingId });
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.status(200).json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all payments (e.g., for admin analytics)
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('bookingId');
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Process refund (called internally by cancelBooking, or standalone if needed)
exports.processRefund = async (req, res) => {
  try {
    const { bookingId, refundAmount } = req.body;

    const payment = await Payment.findOneAndUpdate(
      { bookingId },
      { paymentStatus: 'refunded', refundAmount },
      { new: true }
    );

    if (!payment) return res.status(404).json({ message: "Payment not found" });

    res.status(200).json({ message: "Refund processed", payment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};