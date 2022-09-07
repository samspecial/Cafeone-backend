const MailService = require("../utils/nodemailerSetup");
const mailService = new MailService();

const { validationResult } = require("express-validator");

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

    // const contactMailOptions = {
    //   from: ADMIN_EMAIL,
    //   to: email,
    //   subject: subject,
    //   template: "enquiry", // the name of the template file i.e email.handlebars
    //   context: {
    //     name: `${firstname} ${lastname}`, // replace {{name}} with Adebola

    //     year: year,
    //   },
    // };

    const notificationMailOptions = {
      from: "s.osinloye@sdsd.com",
      to: email,
      subject: "Seat Reservation",
      template: "notification", // the name of the template file i.e email.handlebars
      context: {
        name: `${fullName}`, // replace {{name}} with Adebola
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
        admin: ADMIN_USER,
        year: year,
      },
    };
    // mailService.sendMail(contactMailOptions);
    mailService.sendMail(notificationMailOptions);

    res.status(201).json({
      message: `Seat reservation successful ${fullName}, an email has been sent to ${email}.`,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "Server error",
    });
  }
};
