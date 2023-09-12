const StaticPagesHelper = require("../../models/statisPagesHelper/StaticPagesHelper");

module.exports = {
  getStoreLink: async (req, res) => {
    try {
      // Check if the collection is empty
      const checkLink = await StaticPagesHelper.find();
      if (checkLink.length == 0) {
        const newLink = new StaticPagesHelper({
          googleLink: "https://play.google.com/store",
          appleLink: "https://www.apple.com/app-store",
        });
        await newLink.save();
      }

      const { platform } = req.params;

      const linksSchema = await StaticPagesHelper.find();
      var links = linksSchema[0];
      const googleLink = links.googleLink;
      const appleLink = links.appleLink;

      if (platform == "ios") {
        return res.status(200).json({
          success: true,
          message: "Link Retrieved",
          result: {
            appleLink,
          },
        });
      } else if (platform == "android") {
        return res.status(200).json({
          success: true,
          message: "Link Retrieved",
          result: {
            googleLink,
          },
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Links Retrieved",
          result: {
            googleLink,
            appleLink,
          },
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong try again later!",
        ERROR: err,
      });
    }
  }, // Retrieve store link

  updateStoreLink: async (req, res) => {
    try {
      // Check if the collection is empty
      const checkLink = await StaticPagesHelper.find();
      if (checkLink.length == 0) {
        const newLink = new StaticPagesHelper({
          googleLink: "https://play.google.com/store",
          appleLink: "https://www.apple.com/app-store",
        });
        await newLink.save();
      }

      var oldLinks = await StaticPagesHelper.find();
      oldLinks = oldLinks[0];

      const { googleLink, appleLink } = req.body;
      await StaticPagesHelper.findByIdAndUpdate(
        { _id: oldLinks._id },
        { googleLink, appleLink }
      ).catch((err) => {
        res.status(400).json({
          success: false,
          message: "Can't Update Links",
          ERROR: err,
        });
      });

      res.status(200).json({
        success: true,
        message: "Link Updated",
        result: "Link Updated",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong try again later!",
        ERROR: err,
      });
    }
  }, // Update store link
};
