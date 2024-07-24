const GoldRedeem = require("../../models/gold/GoldRedeem");
const User = require("../../models/User");

module.exports = {
  getRedeemRequests: async (req, res) => {
    try {
      const redeemRequests = await GoldRedeem.find().catch((err) => {
        res.status(400).json({
          success: false,
          message: "Can't retrieve redeem list",
          ERROR: `${err}`,
        });
      });

      res.status(200).json({
        success: true,
        message: "Redeem List retrieved",
        result: redeemRequests,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong try agian later !",
        ERROR: `${err}`,
      });
    }
  }, // Retrieve redeem requests

  addGoldReedeem: async (req, res) => {
    try {
      const { userId } = req.params;
      // check user
      const user = await User.findById({ _id: userId });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }
      if (user.users_invited < 3) {
        return res.status(200).json({
          success: false,
          message: "User didn't invite enough users"
        })
      }

      const { redeemGift, gold } = req.body;
      // Check fields
      if (!redeemGift || !gold) {
        return res.status(400).json({
          success: false,
          message: "Fields can't be empty",
        });
      }

      if (user.gold <= 100) {
        return res.status(403).json({ success: false, message: "Gold must be greater than 100G"})
      }

      const newGold = user.gold - gold;
      // Reduct gold from user
      await User.findByIdAndUpdate({ _id: userId }, { gold: newGold }).catch(
        (err) => {
          res.status(400).json({
            success: false,
            message: "Gold did not redeem",
            ERROR: `${err}`,
          });
        }
      );

      const updatedUser = await User.findById({ _id: userId });

      // Add user to redeem list
      const newRedeem = new GoldRedeem({
        user_id: updatedUser._id,
        user_name: updatedUser.name,
        user_phone: updatedUser.phone,
        user_email: updatedUser.email,
        user_image: updatedUser.image,
        redeemGift,
        gold,
      });

      await newRedeem.save().catch((err) => {
        res.status(400).json({
          success: false,
          message: "Gold did not redeem",
          ERROR: `${err}`,
        });
      });

      delete updatedUser._doc.password
      res.status(200).json({
        success: true,
        message: "Redeemption Added",
        result: { user: updatedUser },
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong try agian later !",
        ERROR: `${err}`,
      });
    }
  }, // A user redeemed some gold

  updateRedeemGoldStatus: async (req, res) => {
    try {
      const { status } = req.body;
      await GoldRedeem.findByIdAndUpdate(req.params.userId, { status });
      res
        .status(200)
        .json({ success: true, result: { _id: req.params.userId } });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something Wen Wrong try again later!",
        ERROR: `${err}`,
      });
    }
  }, // Update Redeem Request status

  deleteRedeemRequest: async (req, res) => {
    try {
      await GoldRedeem.findByIdAndDelete(req.params.userId);
      res.status(200).json({ success: true, result: {} });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something Wen Wrong try again later!",
        ERROR: err,
      });
    }
  }, // Delete a Redeem Request
};
