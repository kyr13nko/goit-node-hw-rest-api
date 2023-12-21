const nodemailer = require("nodemailer");
require("dotenv").config();

// MAILTRAP

const { EMAIL_PASSWORD, EMAIL } = process.env;

const nodemailerConfig = {
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: EMAIL,
    pass: EMAIL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: EMAIL };
  return transport.sendMail(email);
};

module.exports = sendEmail;

// META.UA - doesn't work

// const nodemailerConfig = {
//   host: "smtp.meta.ua",
//   port: 465,
//   secure: true,
//   auth: {
//     user: EMAIL,
//     pass: EMAIL_PASSWORD,
//   },
// };
