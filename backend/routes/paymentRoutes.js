const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, paymentController.processPayment);

router.get("/", protect, paymentController.getAllPayments);

router.get("/:bookingId", protect, paymentController.getPaymentByBooking);

router.put("/refund", protect, paymentController.processRefund);

module.exports = router;