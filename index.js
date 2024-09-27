const express = require("express");
const bodyParser = require("body-parser");
const prisma = require("./prisma/client");
const authRoutes = require("./routes/authRoutes");
const trainRoutes = require("./routes/trainRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/trains", trainRoutes);
app.use("/bookings", bookingRoutes);
app.use("/admin", adminRoutes); // Use admin routes

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
