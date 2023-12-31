const User = require("../../models/User");
const asyncHandler = require("express-async-handler");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const { SendForgetOTP, VerifyOTP, SendHumanOTP } = require("../../config/OTP");

exports.ForgetHandler = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    if (!emailRegex.test(email)) {
      res.status(200).json({ success: false, message: "Invalid email." });
    } else {
      const findOne = await User.findOne({ email });
      if (!findOne) {
        res.status(200).json({success: false, message: "Email does not exist." });
      } else {
        const OTP = await SendForgetOTP(email);
        if (!OTP) {
          res.status(200).json({success: true, message: "Failed to send the email" });
        } else {
          res.sendStatus(200);
        }
      }
    }
  } catch (err) {
    res.status(200).json({ success: false, message: err });
  }
});

exports.VerifyHuman = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    if (!emailRegex.test(email)) {
      res.status(200).json({success: false, message: "Invalid email." });
    } else {
      const OTP = await SendHumanOTP(email);
      if (!OTP) {
        res.status(200).json({success: false, message: "Failed to send the email", OTP });
      } else {
        res.sendStatus(200);
      }
    }
  } catch (err) {
    res.status(200).json({success: false, message: err });
  }
});

exports.HumanOTPCheck = asyncHandler(async (req, res) => {
  const { OTP, email } = req.body;
  if (!email || !OTP)
    res.status(404).json({ message: "All Fields Are Required" });
  else {
    try {
      const validate = await VerifyOTP(OTP, email);
      if (!validate) {
        res.status(200).json({success: false, message: "Invalid Otp" });
      } else {
        res.status(200).json({ success: true, message: "Valid OTP" });
      }
    } catch (err) {
      res.status(200).json({ success: false, message: err.message });
    }
  }
});
exports.OTPCheck = asyncHandler(async (req, res) => {
  const { OTP, email } = req.body;
  if (!email || !OTP)
    res.status(200).json({success: false, message: "All Fields Are Required" });
  else {
    try {
      const validate = await VerifyOTP(OTP, email);
      const user = await User.findOne({ email });
      if (!user) {
        res.status(200).json({success: false, message: "Can't Find Your Email." });
      } else {
        if (!validate) {
          res.status(200).json({success: false, message: "Invalid Otp" });
        } else {
          res.status(200).json({ success: true, id: user.id });
        }
      }
    } catch (err) {
      res.status(200).json({success: false, message: err.message });
    }
  }
});
