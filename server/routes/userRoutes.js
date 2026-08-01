const express = require("express");
const {
  getUser,
  updateUser,
  signup,
  verifyOtp,
  login,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);

// Protected routes
router.get("/profile", protect, getUser);
router.put("/profile", protect, updateUser);

module.exports = router;