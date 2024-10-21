const nodemailer = require('nodemailer');

// Configure the transporter with Ethereal credentials
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: 'zena.larson@ethereal.email',
    pass: 'DbR4A6M6a4ufVMT3Gk',
  },
});

// Function to send OTP email
const sendEmailOtp = async (email, otp) => {
  const mailOptions = {
    from: `alumni-association,<alumni-association.gmail.com>`,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
  };

  try {
    const msg = await transporter.sendMail(mailOptions);
    console.log(`totalmsg: ${msg}`);
    console.log(`msg: ${msg.messageId}`);
    console.log(`OTP sent successfully to ${email}`);
  } catch (error) {
    console.error(`Error sending OTP to ${email}:`, error);
    throw new Error('Failed to send OTP');
  }
};

module.exports = {
  sendEmailOtp,
};
