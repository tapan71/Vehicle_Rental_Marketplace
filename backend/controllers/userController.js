const User = require("../models/User");

const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      city
    } = req.body;

   
    if (!name || !email || !phone || !password || !city) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password,
      city,
      role: "customer",
      licenseStatus: "not_uploaded"
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user
    });

  } catch (error) {
    console.error("Register Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};



const loginUser = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

  
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

   
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

   
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid password"
      });
    }

   
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};


module.exports = {
  registerUser,
  loginUser
};