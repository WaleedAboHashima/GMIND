const User = require("../../models/User");
const { compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const asyncHandler = require("express-async-handler");
module.exports = {
  login: asyncHandler(async (req, res) => {
    const { phone } = req.body;
    const { email } = req.body;
    const lang = req.lang;
    try {
      await User.findOne(phone ? { phone } : { email }).then((user) => {
        //No user found
        if (!user) {
          if (lang === "en") {
            return res.status(404).json({
              success: false,
              message: phone ? "Phone Not Found" : "Email Not Found",
            });
          } else {
            return res.status(404).json({
              success: false,
              message: phone
                ? "لا يوجد حساب بهذا الهاتف"
                : "لا يوجد حساب بهذا الايميل",
            });
          }
        }

        //Incorrect password
        if (!compareSync(req.body.password, user.password)) {
          return res.status(403).json({
            success: false,
            message: "Password Incorrect",
          });
        }

        // Check Activation
        if (!user.active)
          return res.status(403).json({
            success: false,
            message:
              "This account has been suspended! Try contacting the admin",
          });

        // Sign a login token
        const payload = {
          phone: user.phone,
          id: user._id,
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "10d" });
        delete user._doc.password;

        return res.status(200).json({
          success: true,
          message: "Login Successful",
          token: token,
          user,
        });
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong try again later!",
        ERROR: err,
      });
    }
  }), // Login Controller

  checkToken: async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      var userId = decoded.id;

      const user = await User.findById({ _id: userId });
      if (user)
        res
          .status(200)
          .json({ success: true, message: "Logged In", result: user });
      else res.status(401).json({ success: false, message: "Not Logged In" });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong try again later!",
        ERROR: err,
      });
    }
  }, // Check user Token and resend data

  checkConsecutiveLogin: async (req, res) => {
    try {
      const { userId } = req.params;

      // Check user id
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "Uesr Id not found.",
        });
      }
      const user = await User.findById({ _id: userId }).catch((err) => {
        res.status(400).json({
          success: false,
          message: "User not found.",
          ERROR: `${err}`,
        });
      });

      currentDate = {
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        timeStamp: Date.now(),
      };

      // If the user is loggin in the same day he logged in before
      if (
        user.last_login["day"] == currentDate.day &&
        user.last_login["month"] == currentDate.month &&
        user.last_login["year"] == currentDate.year
      ) {
        return res.status(300).json({
          success: true,
          message: "Same Day no more coins",
        });
      }

      var firstDate = new Date(
          `${user.last_login["month"]}/${user.last_login["day"]}/${user.last_login["year"]}`
        ),
        secondDate = new Date(
          `${currentDate.month}/${currentDate.day}/${currentDate.year}`
        );

      var timeDifference = Math.abs(secondDate.getTime() - firstDate.getTime());
      var daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

      if (daysDifference == 1) {
        var new_cons = user.consecutive_days;
        new_cons++;

        await User.findByIdAndUpdate(
          { _id: userId },
          { last_login: currentDate, consecutive_days: new_cons }
        );

        return res.status(200).json({
          success: true,
          message: "New day",
          result: new_cons,
        });
      }

      // Case of login but not cons
      await User.findByIdAndUpdate(
        { _id: userId },
        { last_login: currentDate, consecutive_days: 1 }
      );

      res.status(200).json({
        success: true,
        message: "First Day",
        result: 1,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong try agian later!",
        ERROR: `${err}`,
      });
    }
  }, // Check user daily login and save new login
};
