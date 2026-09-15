const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/users', adminController.getAllUsers);
router.put('/users/:id/status', adminController.updateUserStatus);
router.put('/users/:id/license', adminController.updateLicenseStatus);

router.get('/vehicles', adminController.getAllVehiclesForAdmin);
router.put('/vehicles/:id/approval', adminController.updateVehicleApproval);

router.get('/bookings', adminController.getAllBookingsForAdmin);
router.put('/bookings/:id/force-update', adminController.forceUpdateBooking);

router.get('/analytics', adminController.getAnalytics);

module.exports = router;