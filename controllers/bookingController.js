const path = require("path");
const MailService = require("../utils/nodemailerSetup");
const mailService = new MailService();

const { validationResult } = require("express-validator");

// Create email generator

exports.bookSeat = async (req, res) => {
  const {
    fullName,
    email,
    duration,
    phone,
    plan_name,
    location_name,
    payment_method,
    num_of_seat,
    start_date,
    amount,
    totalAmount,
    endDate,
  } = req.body;
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: errors.array()[0].msg,
      });
    }

    const year = new Date().getFullYear();

    const bookSeatAdmin = {
      from: "CafeOne <s.osinloye@sdsd.com>",
      sender: "s.osinloye@sdsd.com <s.osinloye@sdsd.com>",
      to: `CafeOne Co-working <CafeOne.Co-working@sterling.ng>, Jerry Ogungbaro <jerryogungbaro@gmail.com>`,
      bcc: "psalmueloye@gmail.com",
      subject: "Seat Reservation",
      template: "seat-admin",
      context: {
        name: `${fullName}`,
        subject: "Seat Reservation",
        email,
        duration,
        phone,
        fullName,
        plan_name,
        location_name,
        payment_method,
        num_of_seat,
        start_date,
        amount,
        totalAmount,
        endDate,
        year: year,
      },
    };

    const bookSeatEmail = {
      from: "CafeOne <s.osinloye@sdsd.com>",
      sender: "s.osinloye@sdsd.com <s.osinloye@sdsd.com>",
      to: `${fullName} ${email}`,
      subject: "Seat Reservation",
      template: "seat",
      context: {
        name: `${fullName}`,
        subject: "Seat Reservation",
        email,
        duration,
        phone,
        fullName,
        plan_name,
        location_name,
        payment_method,
        num_of_seat,
        start_date,
        amount,
        totalAmount,
        endDate,
        year: year,
      },
    };

    mailService.sendMail(bookSeatEmail);
    mailService.sendMail(bookSeatAdmin);

    res.status(201).json({
      message: `Seat reservation successful ${fullName}, an email has been sent to ${email}.`,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "Server error",
    });
  }
};

exports.bookSpace = async (req, res) => {
  const {
    fullName,
    email,
    phone,
    duration,
    location_name,
    amount,
    totalAmount,
    payment_method,
    plan,
    start_time,
    date,
  } = req.body;

  try {
    const year = new Date().getFullYear();

    const bookSpaceAdmin = {
      from: "Cafe One <s.osinloye@sdsd.com>",
      sender: "s.osinloye@sdsd.com <s.osinloye@sdsd.com>",
      to: `CafeOne Co-working <CafeOne.Co-working@sterling.ng>, Jerry Ogungbaro <jerryogungbaro@gmail.com>`,
      bcc: "psalmueloye@gmail.com",
      subject: "Space Reservation",
      template: "space-admin",

      context: {
        name: `${fullName}`,
        subject: "Space Reservation",
        email,
        duration,
        phone,
        plan,
        locationName: location_name,
        paymentMethod: payment_method,
        date,
        startTime: start_time,
        amount,
        totalAmount,

        year: year,
      },
    };

    const bookSpaceEmail = {
      from: "Cafe One <s.osinloye@sdsd.com>",
      sender: "s.osinloye@sdsd.com <s.osinloye@sdsd.com>",
      to: `${fullName} <${email}>`,
      subject: "Space Reservation",
      template: "space",
      context: {
        name: `${fullName}`, // replace {{name}} with Adebola
        subject: "Space Reservation",
        email,
        duration,
        phone,
        plan,
        locationName: location_name,
        paymentMethod: payment_method,
        date,
        startTime: start_time,
        amount,
        totalAmount,

        year: year,
      },
    };
    mailService.sendMail(bookSpaceAdmin);
    mailService.sendMail(bookSpaceEmail);
    res.status(201).json({
      message: `Space reservation successful ${fullName}, an email has been sent to ${email}.`,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "Server error",
    });
  }
};
