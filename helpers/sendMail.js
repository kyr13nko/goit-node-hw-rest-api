const nodemailer = require("nodemailer");
require("dotenv").config();

const { EMAIL_PASSWORD, EMAIL } = process.env;

// ELASTICEMAIL
const nodemailerConfig = {
  host: "smtp.elasticemail.com",
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

// MAILTRAP - work
// const nodemailerConfig = {
//   host: "sandbox.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: EMAIL,
//     pass: EMAIL_PASSWORD,
//   },
// };

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
