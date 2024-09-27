const express = require("express");
const router = express.Router();
const {
  bookSeat,
  getBookingDetails,
} = require("../controllers/bookingController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/bookSeat", authMiddleware, bookSeat);
router.get("/:id", authMiddleware, getBookingDetails);

module.exports = router;
