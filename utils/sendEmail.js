const nodemailer = require("nodemailer");
const { EMAIL_USERNAME, EMAIL_PASSWORD } = process.env;

const sendEmail = (options) => {
  const transporter = nodemailer.createTransport({
    host: "mail.gmind.app",
    port: 465,
    secure: true, // use TLS
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD,
    },
  }); // mail transport

  const mailOptions = {
    from: EMAIL_USERNAME,
    to: options.to,
    subject: options.subject,
    html: options.text,
  }; // mail options

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  }); // send the mail and log details
};

module.exports = sendEmail;
