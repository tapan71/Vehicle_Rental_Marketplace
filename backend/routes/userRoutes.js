const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser
} = require("../controllers/userController");




// Register User
// POST /api/users/register
router.post("/register", registerUser);

// Login User
// POST /api/users/login
router.post("/login", loginUser);


module.exports = router;