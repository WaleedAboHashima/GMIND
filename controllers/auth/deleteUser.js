const User = require("../../models/User");
const Feedback = require("../../models/Feedback");
const CWinner = require("../../models/competitions/CWinner");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const tokeVerify = JWT_SECRET;

module.exports = {
  deleteUser: async (req, res) => {
    try {
      const { userId } = req.query;
      try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
          return res.status(401).send({ msg: "UnAuthorized...Access Denied" });
        }
        const verfied = jwt.verify(token, tokeVerify);
        req.user = verfied;
        const user = await User.findById({ _id: userId });
        if (!user) {
          return res.status(400).json({
            success: false,
            message: "User Not Found",
          });
        }
        if (verfied.id == userId) {
          await User.findByIdAndDelete({ _id: userId });
          const feedback = await Feedback.find({ poster_id: userId });
          if (feedback) {
            await Feedback.deleteMany({ poster_id: userId });
          }

          const winner = await CWinner.find({ user_id: userId });
          if (winner) {
            await CWinner.deleteMany({ user_id: userId });
          }

          return res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
          });
        } else {
          return res.status(400).send({
            success: false,
            message: "Wrong Credentials",
          });
        }
      } catch (err) {
        return res.status(403).json({
          success: false,
          message: "Invalid Token",
          ERROR: err,
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong try again later!",
        ERROR: err,
      });
    }
  }, // Delete an Existing User
};
