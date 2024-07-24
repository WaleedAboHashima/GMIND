// Packages
const requestIP = require("request-ip");
const referralCodes = require("referral-codes");
const { hashSync } = require("bcrypt");

// Project dependencies
const User = require("../../models/User");
// const RegisteredDevices = require("../../models/Devices/RegisteredDevices");

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, phone, password, referral_code } = req.body;

      const deviceId = requestIP.getClientIp(req);

      if (!deviceId) {
        return res
          .status(403)
          .json({ success: false, message: "Device undefined" });
      }

      // Check if user already registered today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      /* const checkRegUser = await RegisteredDevices.findOne({
        device: deviceId,
        lastRegistrationDate: { $gte: today },
      });
      if (checkRegUser) {
        return res.status(200).json({
          success: false,
          message: "Registration Limit exceeded",
        });
      }
*/
      // Check Fields not Empty
      if (!name || !email || !password) {
        return res.status(403).json({
          success: false,
          message: "Some Fields are Empty",
        });
      }

      // Check Phone Existance
      if (phone) {
        const checkPhone = await User.findOne({
          phone: phone,
        });

        if (checkPhone) {
          return res.status(409).json({
            success: false,
            message: "Phone Exists",
          });
        }
      }

      // Check Email Existance
      const checkEmail = await User.findOne({
        email: email,
      });

      if (checkEmail) {
        return res.status(409).json({
          success: false,
          message: "Email Exists",
        });
      }

      // Check Ref code to give points to the user
      if (referral_code) {
        const user = await User.findOne({ referral_code }).catch((err) => {
          return res.status(404).json({
            success: false,
            message: "Referral Code ERROR",
          });
        });
        if (user) {
          var newPoints = user.points + 5;
          var newUser = user.users_invited + 1;
          await User.findOneAndUpdate({ referral_code }, { points: newPoints }, {users_invited: newUser});
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
        invited_by: referral_code && referral_code,
      });
      await user.save();
      // .then(async () => {
      //   const newDevice = new RegisteredDevices({
      //     device: deviceId,
      //     associatedUserEmail: email,
      //     lastRegistrationDate: new Date(),
      //   });

      // await newDevice.save();

      // Respone a Success Message
      res.status(201).json({
        success: true,
        message: "Register Successful",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong try again later!",
        ERROR: err,
      });
    }
  }, // Register a User
};
