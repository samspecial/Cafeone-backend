const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const { SMTP_HOST, ADMIN_EMAIL, PASSWORD } = process.env;
// initialize nodemailer
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: ADMIN_EMAIL,
//     pass: PASSWORD,
//   },
// });

class MailService {
  constructor(service, user, password) {
    const options = {
      viewEngine: {
        // partialsDir: __dirname + "/views/partials",
        layoutsDir: path.join(__dirname, "../views/"),
        defaultLayout: false,
        extname: ".hbs",
      },
      extName: ".hbs",
      viewPath: "views",
    };

    this._transporter = nodemailer.createTransport({
      service: SMTP_HOST,
      auth: {
        user: ADMIN_EMAIL,
        pass: PASSWORD,
      },
    });
    this._transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    this._transporter.use("compile", hbs(options));
  }
  sendMail({ to, from, subject, template, context, attachments }) {
    return this._transporter.sendMail({
      to,
      from,
      subject,
      template,
      context,
      attachments,
    });
  }
}

module.exports = MailService;

// point to the template folder

// use a template file with nodemailer

// module.exports = transporter;
