const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const bookingForm = require("../controllers/bookingController");

router.post(
  "/",
  [
    check("email").isEmail(),
    check("message", "Message value should be more than 2").isLength({
      min: 2,
    }),
  ],
  bookingForm.createContact
);

module.exports = router;
