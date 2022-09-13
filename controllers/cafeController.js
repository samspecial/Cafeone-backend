const path = require("path");
const MailService = require("../utils/nodemailerSetup");
const mailService = new MailService();

const { validationResult } = require("express-validator");

const { ADMIN_EMAIL, ADMIN_USER } = process.env;

// Create email generator

exports.makeOrder = async (req, res) => {
  const {
    fullName,
    email,
    phone,
    location_name,
    payment_method,
    totalAmount,
    cartItems,
    totalQuantity,
  } = req.body;
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: errors.array()[0].msg,
      });
    }

    const year = new Date().getFullYear();

    const cafeAdminEmail = {
      from: "CafeOne <s.osinloye@sdsd.com>",
      sender: "s.osinloye@sdsd.com <s.osinloye@sdsd.com>",
      to: `CafeOne Co-working <CafeOne.Co-working@sterling.ng>, Jerry Ogungbaro <jerryogungbaro@gmail.com>`,
      bcc: "psalmueloye@gmail.com",
      subject: "CafeOne Order",
      template: "cafe-admin",
      context: {
        name: `${fullName}`,
        subject: "Cafe One Order",
        email,
        duration,
        phone,
        cartItems,
        location_name,
        payment_method,
        totalQuantity,
        totalAmount,
        year: year,
      },
    };

    const cafeOrderEmail = {
      from: "CafeOne <s.osinloye@sdsd.com>",
      to: email,
      subject: "CafeOne Order",
      template: "cafe",
      context: {
        name: `${fullName}`,
        subject: "CafeOne Order",
        email,
        phone,
        cartItems,
        location_name,
        payment_method,
        totalQuantity,
        totalAmount,
        year: year,
      },
    };

    mailService.sendMail(cafeAdminEmail);
    mailService.sendMail(cafeOrderEmail);

    res.status(201).json({
      message: `Order made by ${fullName} was successful, an email has been sent to ${email}.`,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "Server error",
    });
  }
};
