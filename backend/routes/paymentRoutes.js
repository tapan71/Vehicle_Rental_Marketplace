const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/', paymentController.processPayment);
router.get('/', paymentController.getAllPayments);
router.get('/:bookingId', paymentController.getPaymentByBooking);
router.put('/refund', paymentController.processRefund);

module.exports = router;