const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { bookSeat, bookSpace } = require("../controllers/bookingController");

router.post("/seat", [check("email").isEmail()], bookSeat);
router.post("/space", [check("email").isEmail()], bookSpace);

module.exports = router;
