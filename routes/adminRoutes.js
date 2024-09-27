const express = require("express");
const router = express.Router();
const { addTrain, updateTrain } = require("../controllers/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.post("/addTrain", adminMiddleware, addTrain);
router.put("/updateTrain/:trainId", adminMiddleware, updateTrain);

module.exports = router;
