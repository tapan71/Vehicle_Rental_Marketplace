require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const vehicleRoutes = require("./routes/vehicleRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// API routes
app.get("/api", (req, res) => {
  res.json({
    message: "Vehicle Rental Marketplace API is running"
  });
});

app.use("/api/vehicles", vehicleRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});