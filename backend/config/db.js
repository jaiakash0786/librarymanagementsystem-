const mongoose = require("mongoose");
const dns = require("dns");

// Force Google DNS — fixes ECONNREFUSED on SRV lookup
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      family: 4, // Force IPv4
    });
    console.log("MongoDB connected successfully ✅");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;