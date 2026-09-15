const Vehicle = require("../models/Vehicle");
const Owner = require("../models/Owner");


const addVehicle = async (req, res) => {
  try {
    const {
      vehicleid,
      brand,
      model,
      type,
      price,
      status,
      year,
      ownerid
    } = req.body;

    // Check required fields
    if (
      !vehicleid ||
      !brand ||
      !model ||
      !type ||
      !price ||
      !year ||
      !ownerid
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const existingVehicle = await Vehicle.findOne({ vehicleid });

    if (existingVehicle) {
      return res.status(400).json({
        success: false,
        message: "Vehicle already exists"
      });
    }

    // Create vehicle
    const vehicle = await Vehicle.create({
      vehicleid,
      brand,
      model,
      type,
      price,
      status: status || "available",
      year,
      ownerid
    });

    res.status(201).json({
      success: true,
      message: "Vehicle added successfully",
      vehicle
    });

  } catch (error) {
    console.error("Add Vehicle Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};



const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find()
      .populate("ownerid");

    res.status(200).json({
      success: true,
      count: vehicles.length,
      vehicles
    });

  } catch (error) {
    console.error("Get Vehicles Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};



const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id)
      .populate("ownerid");

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found"
      });
    }

    res.status(200).json({
      success: true,
      vehicle
    });

  } catch (error) {
    console.error("Get Vehicle Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      vehicle
    });

  } catch (error) {
    console.error("Update Vehicle Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};


const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully"
    });

  } catch (error) {
    console.error("Delete Vehicle Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};



module.exports = {
  addVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle
};