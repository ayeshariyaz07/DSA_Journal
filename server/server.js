const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const problemRoutes = require("./routes/problemRoutes");

dotenv.config();
console.log(process.env.GEMINI_API_KEY);

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/problems", problemRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 DSA Journal Backend is Running!");
});

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});