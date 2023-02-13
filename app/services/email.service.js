const nodemailer = require("nodemailer");

module.exports.transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "trustokerezi42@gmail.com",
    pass: "sqpmuserzurfdiit",
  },
});
