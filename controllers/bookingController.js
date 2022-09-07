const MailService = require("../utils/nodemailerSetup");
const mailService = new MailService();

const Contact = require("../models/contact");
const { validationResult } = require("express-validator");
const { sendEmail } = require("../utils/emailSender");
// const transporter = require("../utils/nodemailerSetup");

const { ADMIN_EMAIL, ADMIN_USER } = process.env;

// Create email generator

exports.bookSeat = async (req, res, next) => {
  try {
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

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: errors.array()[0].msg,
      });
    }

    const year = new Date().getFullYear();

    const contactMailOptions = {
      from: ADMIN_EMAIL,
      to: email,
      subject: subject,
      template: "enquiry", // the name of the template file i.e email.handlebars
      context: {
        name: `${firstname} ${lastname}`, // replace {{name}} with Adebola

        year: year,
      },
    };

    const notificationMailOptions = {
      from: "s.osinloye@sdsd.com",
      to: email,
      subject: "Seat Reservation",
      template: "notification", // the name of the template file i.e email.handlebars
      context: {
        name: `${fullName}`, // replace {{name}} with Adebola
        subject: subject,
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
        admin: ADMIN_USER,
        year: year,
      },
    };
    // mailService.sendMail(contactMailOptions);
    mailService.sendMail(notificationMailOptions);
    // // console.log(contactMailOptions);
    // //Contact Email
    // transporter.sendMail(contactMailOptions, function (error, info) {
    //   console.log(error);
    //   if (error) {
    //     return console.log(error);
    //   }
    //   console.log("Message sent: " + info.response);
    // });

    // //Notification EMail
    // transporter.sendMail(notificationMailOptions, function (error, info) {
    //   if (error) {
    //     return console.log(error);
    //   }
    //   console.log("Message sent: " + info.response);
    // });
    // sendEmail(contactFormEmail);
    // sendEmail(notificationEmail);

    res.status(201).json({
      message: `Seat reservation successful ${fullName}, an email has been sent to ${email}.`,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "Server error",
    });
  }
};
