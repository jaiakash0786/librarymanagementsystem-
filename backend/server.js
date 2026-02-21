const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

// DB
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/books", bookRoutes);

app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Library Management Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
