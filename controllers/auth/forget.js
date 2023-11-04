const User = require('../../models/User');
const asyncHandler = require('express-async-handler');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const { SendForgetOTP, VerifyOTP, SendHumanOTP } = require('../../config/OTP');

exports.ForgetHandler = asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
      if (!emailRegex.test(email)) {
        res.status(400).json({ message: "Invalid email." });
      } else {
        const findOne = await User.findOne({ email });
        if (!findOne) {
          res.status(403).json({ message: "Email does not exist." });
        } else {
          const OTP = await SendForgetOTP(email);
          if (!OTP) {
            res.status(403).json({ message: "Failed to send the email" });
          } else {
            res.sendStatus(200);
          }
        }
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
});

exports.VerifyHuman = asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
      if (!emailRegex.test(email)) {
        res.status(400).json({ message: "Invalid email." });
      } else {
        const findOne = await User.findOne({ email });
        if (!findOne) {
          res.status(403).json({ message: "Email does not exist." });
        } else {
          const OTP = await SendHumanOTP(email);
          if (!OTP) {
            res.status(403).json({ message: "Failed to send the email" });
          } else {
            res.sendStatus(200);
          }
        }
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
});
  
exports.OTPCheck = asyncHandler(async (req, res) => {
  const { OTP, email } = req.body;
  if (!email || !OTP)
    res.status(404).json({ message: "All Fields Are Required" });
  else {
    try {
      const validate = await VerifyOTP(OTP, email);
      const user = await User.findOne({ email });
      if (!user) {
        res.status(403).json({ message: "Can't Find Your Email." });
      } else {
        if (!validate) {
          res.status(403).json({ message: "Invalid Otp" });
        } else {
          res.status(200).json({ id: user.id });
        }
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
});