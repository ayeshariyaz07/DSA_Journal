const dns = require("dns");
dns.setServers(["8.8.8.8"]);

const dotenv = require("dotenv")
dotenv.config();


const sendEmail = require("./utils/sendEmail");

const express = require("express");
const cors = require("cors");


const connectDB = require("./config/db");

const problemRoutes = require("./routes/problemRoutes");
const userRoutes = require("./routes/userRoutes");



// Connect MongoDB
connectDB();


const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// email need to remove
sendEmail(
  process.env.EMAIL,
  "Test Email",
  "Hello! Your email setup is working."
);

// Routes
app.use("/api/problems", problemRoutes);

app.use("/api/users", userRoutes);



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