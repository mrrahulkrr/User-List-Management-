const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVICE,
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmails = (emails) => {
  emails.forEach(email => {
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email.to,
      subject: email.subject,
      html: email.html,
    });
  });
};

module.exports = { sendEmails };
