const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const { SMTP_HOST, ADMIN_EMAIL, PASSWORD } = process.env;

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
      service: "gmail",
      port: 465,
      auth: {
        user: ADMIN_EMAIL,
        pass: PASSWORD,
      },
      tls: {
        ciphers: "SSLv3",
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
  sendMail({ to, bcc, from, subject, template, context }) {
    return this._transporter.sendMail({
      to,
      bcc,
      from,
      subject,
      template,
      context,
    });
  }
}

module.exports = MailService;
