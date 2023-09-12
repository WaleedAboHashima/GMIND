const Feedback = require("../../models/Feedback");
const User = require("../../models/User");

module.exports = {
  getAllFeedbacks: async (req, res) => {
    try {
      const feedbacks = await Feedback.find({})
        .sort({ _id: -1 })
        .catch((err) => {
          res.status(400).json({
            success: false,
            message: "Can't fetch Feedbacks",
            ERROR: err,
          });
        });

      res.status(200).json({
        success: true,
        message: "Feedbacks retrieved successfuly",
        result: feedbacks,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong try again later!",
        ERROR: err,
      });
    }
  }, // Fetch all feedbacks

  addFeedback: async (req, res) => {
    try {
      const { poster_id, post } = req.body;

      // Check that both not empty
      if (!poster_id || !post) {
        return res.status(400).json({
          success: false,
          message: "Fields can't be empty!",
        });
      }

      // Check that user exists
      const user = await User.findById({ _id: poster_id });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User Not Found!",
        });
      }

      const newFeedback = new Feedback({
        poster_id,
        poster_name: user.name,
        poster_phone: user.phone,
        poster_email: user.email,
        poster_image: user.image,
        post,
      });

      await newFeedback.save().catch((err) => {
        res.status(400).json({
          success: false,
          message: "Feedback can't be saved!",
          ERROR: err,
        });
      });

      res.status(200).json({
        success: true,
        message: "Feedback Saved",
        result: newFeedback,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong try again later!",
        ERROR: err,
      });
    }
  }, // Add new feedback
};
