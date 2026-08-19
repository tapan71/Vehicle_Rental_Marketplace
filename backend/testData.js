require("dotenv").config();

const connectDB = require("./config/db");

const User = require("./models/User");
const Owner = require("./models/Owner");
const Vehicle = require("./models/Vehicle");

const createTestData = async () => {
  await connectDB();

  try {
   
    const user = await User.findOne({
      email: "tapan@gmail.com"
    });

    
    const owner = await Owner.create({
      ownerid: "OWN001",
      name: "Tapan",
      email: "Tapan@gmail.com",
      phone: "9327102008"
    });

    console.log("Owner Created Successfully");
    console.log(owner);

    const vehicle = await Vehicle.create({
      vehicleid: "GJ15AC4554",
      brand: "Honda",
      model: "Activa 6G",
      type: "Bike",
      price: 500,
      status: "available",
      year: 2024,
      ownerid: owner._id
    });

    console.log("Vehicle Created Successfully");
    console.log(vehicle);

  } catch (error) {
    console.error("Error:", error.message);
  }
};

createTestData();