const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, reviewController.submitReview);
router.get('/vehicle/:vehicleId', reviewController.getReviewsByVehicle);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

module.exports = router;