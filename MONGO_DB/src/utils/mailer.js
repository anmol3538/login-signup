const nodemailer = require('nodemailer');
const {EMAIL_ID, EMAIL_PASS} = require('../config/server-config')
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_ID,
    pass: EMAIL_PASS
  }
});

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: EMAIL_ID,
      to,
      subject,
      text
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
