const CWinner = require("../../models/competitions/CWinner");
const User = require("../../models/User");

module.exports = {
  getCompetitionWinners: async (req, res) => {
    try {
      const winners = await CWinner.find().sort({ _id: -1 });
      res.status(200).json({ success: true, result: winners });
    } catch (err) {
      res.status(500).json({
        success: false,
        ERROR: err,
        message: "Something went wrong try again later!",
      });
    }
  }, // Retrieve all Competitions Winners

  addCompetitionWinners: async (req, res) => {
    try {
      const { user_id, gift } = req.body;

      // Fetch User data
      const user = await User.findById({ _id: user_id });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User Data Can't be retrieved!",
        });
      }

      const newGift = new CWinner({
        user_id,
        user_name: user.name,
        user_phone: user.phone,
        user_email: user.email,
        user_image: user.image,
        gift,
      });

      await newGift.save().catch((err) => {
        res.status(400).json({
          success: false,
          ERROR: err,
          message: "Can't Save the winner",
        });
      });

      res.status(200).json({
        success: true,
        message: "Winner Saved.",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        ERROR: err,
        message: "Something went wrong try again later!",
      });
    }
  }, //Add new winners

  updateCompetitionWinnerStatus: async (req, res) => {
    try {
      const { status } = req.body;
      await CWinner.findByIdAndUpdate(req.params.winnerId, { status });
      res
        .status(200)
        .json({ success: true, result: { _id: req.params.winnerId } });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something Wen Wrong try again later!",
        ERROR: err,
      });
    }
  }, // Update Winner status

  deleteCompetitionWinner: async (req, res) => {
    try {
      await CWinner.findByIdAndDelete(req.params.winnerId);
      res.status(200).json({ success: true, result: {} });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something Wen Wrong try again later!",
        ERROR: err,
      });
    }
  }, // Delete a winner
};
