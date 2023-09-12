const ChWinners = require("../../models/challenges/ChWinners");
const User = require("../../models/User");

module.exports = {
  addChallengeWinners: async (req, res) => {
    try {
      const { userId } = req.params;
      const { time, score } = req.body;

      // Check if user already entered the challenge
      const checkUser = await ChWinners.findOne({ user_id: userId });
      if (checkUser) {
        return res.status(200).json({
          success: true,
          message: "User entered the challenge before",
          result: { added: false },
        });
      }

      const user = await User.findById({ _id: userId });

      const newWinner = new ChWinners({
        user_id: user._id,
        user_name: user.name,
        user_phone: user.phone,
        user_email: user.email,
        user_image: user.image,
        time: time,
        score: score,
      });

      await newWinner.save().catch((err) => {
        res.status(400).json({
          success: false,
          message: "User not added to winners list",
          ERROR: err,
        });
      });

      res.status(200).json({
        success: true,
        message: "User added to winners",
        result: {
          added: true,
        },
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Something went wrong try again later!",
        ERROR: err,
      });
    }
  }, // add challenge winner

  getChallengeRank: async (req, res) => {
    try {
      const users = await ChWinners.find().sort({score: "desc"}).sort({time: "asc"});
      res.status(200).json({
        success: true,
        message: "Rank retrieved",
        result: {
          users,
        },
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Something went wrong try again later!",
        ERROR: err,
      });
    }
  }, // get challenge rank
};
