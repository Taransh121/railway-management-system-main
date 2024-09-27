const express = require("express");
const router = express.Router();
const { addTrain, getTrains } = require("../controllers/trainController");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.post("/addTrain", adminMiddleware, addTrain);
router.get("/", getTrains);

module.exports = router;
