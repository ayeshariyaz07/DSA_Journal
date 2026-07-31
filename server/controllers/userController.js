const User = require("../models/User");
const Otp = require("../models/Otp");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

// =====================
// Signup
// =====================
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Remove any old OTP for this email
    await Otp.deleteMany({ email });

    // Save the new OTP
    // Hash password first
    const hashedPassword = await bcrypt.hash(password, 10);

    await Otp.create({
      name,
      email,
      password: hashedPassword,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });
    const savedOtp = await Otp.findOne({ email });
    console.log("Saved OTP:", savedOtp);

    // Send OTP email
    await sendEmail(
      email,
      "Email Verification",
      `Your OTP is ${otp}. It is valid for 5 minutes.`
    );

    res.status(200).json({
      message: "OTP sent successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


/// otp verification


const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  console.log("Email received:", email);
  try {
    const { email, otp } = req.body;

    // Find OTP record
    const otpData = await Otp.findOne({ email });
    console.log("OTP Data:", otpData);

    if (!otpData) {
      return res.status(400).json({
        message: "OTP not found",
      });
    }

    // Check if OTP has expired
    if (otpData.expiresAt < new Date()) {
      await Otp.deleteOne({ email });

      return res.status(400).json({
        message: "OTP has expired",
      });
    }

    // Check if OTP matches
    if (otpData.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    // Create the user
    const newUser = await User.create({
      name: otpData.name,
      email: otpData.email,
      password: otpData.password,
    });

    // Delete the OTP after successful verification
    await Otp.deleteOne({ email });

    res.status(201).json({
      message: "Signup Successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// =====================
// Login
// =====================
const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================
// Get User
// =====================
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// =====================
// Update User
// =====================
const updateUser = async (req, res) => {
  try {

    const updated = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      {
        new: true,
      }
    ).select("-password");

    res.json(updated);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  signup,
  verifyOtp,
  login,
  getUser,
  updateUser,
};