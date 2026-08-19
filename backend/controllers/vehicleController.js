const getAllVehicles = async (req, res) => {
  try {
    res.status(200).json({
      message: "Get all vehicles API working"
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = {
  getAllVehicles
};