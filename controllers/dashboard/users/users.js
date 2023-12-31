const User = require("../../../models/User");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().sort({ _id: -1 });
      res.status(200).json({ success: true, result: users });
    } catch (err) {
      res.status(500).send({
        success: false,
        ERROR: err,
        message: "Something went wrong try again later!",
      });
    }
  }, // Fetch ALL Users

  deleteAdmin: async (req, res) => {
    const { userId } = req.params;
    try {
      await User.findByIdAndDelete(userId).then((user) => {
        if (!user)
          return res
            .status(404)
            .json({ success: false, message: "Admin not found" });
        else {
          res.status(200).json({ success: true, user });
        }
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  updateUserStatus: async (req, res) => {
    try {
      const { active } = req.body;
      await User.findByIdAndUpdate(req.params.userId, { active });
      res
        .status(200)
        .json({ success: true, result: { _id: req.params.userId } });
    } catch (err) {
      res.status(500).json({
        message: "Something Wen Wrong try again later!",
        ERROR: err,
      });
    }
  }, // To update Users Status form manage users

  updateUserPoints: async (req, res) => {
    try {
      const { gold } = req.body;

      await User.findByIdAndUpdate(req.params.userId, {
        $inc: { gold: gold },
      });
      const updatedUser = await User.findById({ _id: req.params.userId });

      res.status(200).json({ success: true, result: updatedUser });
    } catch (err) {
      res.status(500).json({
        message: "Something Wen Wrong try again later!",
        ERROR: err,
      });
    }
  }, // Increment user points

  deductUserPoints: async (req, res) => {
    try {
      const { gold } = req.body;
      const user = await User.findById({ _id: req.params.userId });
      // const newPoints = user.points - points;
      const newGold = user.gold - gold;

      await User.findByIdAndUpdate(req.params.userId, { gold: newGold });
      const updatedUser = await User.findById({ _id: req.params.userId });

      res.status(200).json({ success: true, result: updatedUser });
    } catch (err) {
      res.status(500).json({
        message: "Something Went Wrong try again later!",
        ERROR: err,
      });
    }
  }, // Deduct user points

  incrementUserLevel: async (req, res) => {
    try {
      const { category, level } = req.body;

      const user = await User.findOne({
        _id: req.params.userId,
        "opened_levels.category": category,
      });

      if (!user) {
        await User.findByIdAndUpdate(
          {
            _id: req.params.userId,
          },
          {
            $push: { opened_levels: { category, level: level + 1 } },
          }
        );
        const updatedUser = await User.findById({ _id: req.params.userId });

        return res.status(200).json({ success: true, result: updatedUser });
      }

      const idx = user.opened_levels.findIndex((x) => x.category == category);

      if (level == user.opened_levels[idx].level) {
        await User.updateOne(
          { _id: req.params.userId, "opened_levels.category": category },
          {
            $set: {
              "opened_levels.$.level": level + 1,
            },
          }
        );
      }

      const updatedUser = await User.findById({ _id: req.params.userId });

      res.status(200).json({ success: true, result: updatedUser });
    } catch (err) {
      res.status(500).json({
        message: "Something Wen Wrong try again later!",
        ERROR: err,
      });
    }
  }, // Increment user level by 1

  getUserCategoryLevels: async (req, res) => {
    try {
      const { category } = req.body;
      const user = await User.findOne({
        _id: req.params.userId,
        "opened_levels.category": category,
      });

      if (!user) {
        return res
          .status(200)
          .json({ success: true, result: { category, level: 1 } });
      }

      const idx = user.opened_levels.findIndex((x) => x.category == category);

      res.status(200).json({
        success: true,
        result: { category, level: user.opened_levels[idx].level },
      });
    } catch (err) {
      res.status(500).json({
        message: "Something Wen Wrong try again later!",
        ERROR: err,
      });
    }
  }, // Get current category Levels for A User
};
