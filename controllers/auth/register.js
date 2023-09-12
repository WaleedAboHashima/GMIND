const { hashSync } = require("bcrypt");
const User = require("../../models/User");
const referralCodes = require("referral-codes");

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, phone, password, referral_code } = req.body;

      // Check Fields not Empty
      if (!name || !phone || !password) {
        return res.status(401).json({
          success: false,
          message: "Some Fields are Empty",
        });
      }

      // Check Phone Existance
      const checkPhone = await User.findOne({
        phone: phone,
      });

      if (checkPhone) {
        return res.status(401).json({
          success: false,
          message: "Phone Exists",
        });
      }

      if (email) {
        // Check Email Existance
        const checkEmail = await User.findOne({
          email: email,
        });

        if (checkEmail) {
          return res.status(401).json({
            success: false,
            message: "Email Exists",
          });
        }
      }

      // Check Ref code to give points to the user
      if (referral_code) {
        const user = await User.findOne({ referral_code }).catch((err) => {
          return res.status(400).json({
            success: false,
            message: "Referral Code ERROR",
          });
        });
        if (user) {
          var newPoints = user.points + 5;
          await User.findOneAndUpdate({ referral_code }, { points: newPoints });
        }
      }

      // Password Encryption
      const hashedPassword = hashSync(password, 10);

      // Generate Ref code for new user
      const newRef = referralCodes.generate({
        length: 8,
      });

      // Create new user schema and save to Database
      const user = new User({
        name,
        email,
        phone,
        password: hashedPassword,
        referral_code: newRef[0],
      });
      await user.save();

      // Respone a Success Message
      return res.status(200).json({
        success: true,
        message: "Register Successful",
        result: user,
      });
    } catch (err) {
      console.log("🚀 ~ file: register.js ~ line 84 ~ register: ~ err", err);
      return res.status(501).json({
        success: false,
        message: "Something went wrong try again later!",
        ERROR: err,
      });
    }
  }, // Register a User
};
