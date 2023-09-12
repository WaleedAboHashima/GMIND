const User = require("../../models/User");

module.exports = {
  getLeaderBoard: async (req, res) => {
    try {
      const users = await User.find().sort({ points: "desc" });

      res.status(200).json({
        success: true,
        message: "Users retrieved",
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
  }, // Return users sorted by points
};
