const express = require("express");

const router = express.Router();

const {
  addVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle
} = require("../controllers/vehicleController");


// ADD VEHICLE
router.post("/", addVehicle);


// GET ALL VEHICLES
router.get("/", getAllVehicles);


// GET VEHICLE BY ID
router.get("/:id", getVehicleById);


// UPDATE VEHICLE
router.put("/:id", updateVehicle);


// DELETE VEHICLE
router.delete("/:id", deleteVehicle);


module.exports = router;