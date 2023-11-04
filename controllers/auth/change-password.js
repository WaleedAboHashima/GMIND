const User = require("../../models/User");
const { compareSync, hashSync } = require("bcrypt");
const asyncHandler = require("express-async-handler");
module.exports = {
  UpdatePassword: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { newPassword, oldPassword } = req.body;
    if (!id || !newPassword)
      res.status(403).json({ message: "All Fields Are Required." });
    else {
      try {
        const user = await User.findById(id);
        const checkPassword = await compareSync(oldPassword, user.password);
        if (checkPassword) {
          const password = await hashSync(newPassword, 10);
          const user = await User.findByIdAndUpdate(id, { password }).exec();
          if (!user) {
            res.status(404).json({ message: "User Not Found" });
          } else {
            res.status(200).json({success: true, message: "Password Successfully Updated." });
          }
        } else {
          res.status(403).json({ success: false, message: "Incorrect Old Password." });
        }
      } catch (err) {
        res.status(500).json({ message: err });
      }
    }
  }),

  // forgotPassword: async (req, res) => {
  //   try {
  //     const { email } = req.body;

  //     // Check if The Email is saved
  //     const user = await User.findOne({ email });
  //     if (!user) {
  //       return res.status(400).json({
  //         msg: "Email Not Found",
  //       });
  //     }

  //     // Reset Token Gen and add to database hashed (private) version of token
  //     const resetToken = user.getResetPasswordToken();
  //     await user.save();

  //     // Create reset url to email to provided email
  //     const resetUrl = `${baseURL}/api/auth/forgot-password/${resetToken}`;

  //     // HTML Message
  //     const message = `
  //         <h1>You have requested a password reset</h1>
  //         <h6>* Link Expires in 20 Minutes</h6>
  //         <p>Please click and follow the link:</p>

  //         <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
  //       `;

  //     // Send the Email with reset
  //     try {
  //       sendEmail({
  //         to: user.email,
  //         subject: "Password Reset Mind Games App",
  //         text: message,
  //       });

  //       return res.status(200).json({ msg: "Email Sent" });
  //     } catch (err) {
  //       user.resetPasswordToken = undefined;
  //       user.resetPasswordExpire = undefined;
  //       await user.save();
  //       return res.status(400).json({ msg: "Email Not Sent" });
  //     }
  //   } catch (err) {
  //     return res.status(500).json({
  //       msg: "Internal Server ERROR",
  //       error: `${err}`,
  //     });
  //   }
  // }, // Forgot Password

  // resetPassword: async (req, res) => {
  //   try {
  //     const { resetToken } = req.params;
  //     const { password } = req.body;

  //     // Compare token in URL params to hashed token
  //     const resetPasswordToken = crypto
  //       .createHash("sha256")
  //       .update(resetToken)
  //       .digest("hex");

  //     const user = await User.findOne({
  //       resetPasswordToken,
  //       resetPasswordExpire: { $gt: Date.now() },
  //     });
  //     if (!user) {
  //       return res.status(400).json({
  //         msg: "Invalid Token",
  //       });
  //     }

  //     user.password = hashSync(password, 10);
  //     user.resetPasswordToken = undefined;
  //     user.resetPasswordExpire = undefined;

  //     await user.save();

  //     res.status(200).send({
  //       msg: "Password Reset Successful",
  //     });
  //   } catch (err) {
  //     return res.status(500).json({
  //       msg: "Internal Server ERROR",
  //       error: `${err}`,
  //     });
  //   }
  // }, // Reset Password
};
