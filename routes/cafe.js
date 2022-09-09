const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { makeOrder } = require("../controllers/cafeController");

router.post("/cafe", [check("email").isEmail()], makeOrder);

module.exports = router;
