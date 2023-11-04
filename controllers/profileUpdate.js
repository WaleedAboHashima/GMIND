const User = require("../models/User");
const { baseURL } = process.env;

module.exports = {
  getProfile: async (req, res) => {
    try {
      const { id } = req.params;
      await User.findById(id).then((user) =>
        res.status(200).json({ success: true, msg: "Profile Retreived Successfully", user })
      );
    } catch (err) {
      return res.status(404).json({
        success: false,
        msg: "User Not Found",
        error: err,
      });
    }
  },
  deleteProfile: async (req, res) => {
    try {
      const { id } = req.params;
      await User.findByIdAndDelete(id).then((user) => {
        if (user) {
          res.status(200).json({ msg: "User Deleted Successfully", user });
        }
        else {res.status(404).json({ msg: "User Not Found"});}
      });
    } catch (err) {
      return res.status(403).json({
        msg: "Profile Not Deleted",
        error: err,
        
      });
    }
  },
  profileUpdate: async (req, res) => {
    try {
      const { id, name, phone, email } = req.body;

      await User.findByIdAndUpdate({ _id: id }, { name, phone, email });
      await User.findById({ _id: id })
        .then((user) => {
          return res.status(200).json({
            msg: "Profile Updated Successfully",
            user,
          });
        })
        .catch((err) => {
          return res.status(400).json({
            msg: "Profile Not Updated",
            error: err,
          });
        });
    } catch (err) {
      return res.status(500).json({
        msg: "Internal Server ERROR",
        error: `${err}`,
      });
    }
  }, // Update Profile Data

  imageUpdate: async (req, res) => {
    try {
      const { id, image } = req.body;

      await User.findByIdAndUpdate({ _id: id }, { image });
      await User.findById({ _id: id })
        .then((user) => {
          return res.status(200).json({
            msg: "User Image Updated Successfully",
            user,
          });
        })
        .catch((err) => {
          return res.status(400).json({
            msg: "Uer Image Not Updated",
            error: err,
          });
        });
    } catch (err) {
      return res.status(500).json({
        msg: "Internal Server ERROR",
        error: `${err}`,
      });
    }
  }, // Update User Image

  getAvatars: async (req, res) => {
    try {
      const avatars = [];
      for (let i = 1; i <= 66; i++)
        avatars[i - 1] = `${baseURL}/avatar/${i}.png`;

      res.status(200).json({
        success: true,
        message: "Avatars list retrieved",
        result: avatars,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong try again later!",
        ERROR: `${err}`,
      });
    }
  }, // get all avatars
};
