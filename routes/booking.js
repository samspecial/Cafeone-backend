const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { bookSeat } = require("../controllers/bookingController");

router.post("/", [check("email").isEmail()], bookSeat);

module.exports = router;
