const StaticPagesHelper = require("../../models/statisPagesHelper/StaticPagesHelper");

module.exports = {
  getStaticPage: async (req, res) => {
    try {
      // Check if the collection is empty
      const checkLink = await StaticPagesHelper.find();
      if (checkLink.length == 0) {
        const newLink = new StaticPagesHelper({
          aboutUsPage: "<h1> About Us </h1>",
          privacyPolicyPage: "<h1> Privacy Policy </h1>",
        });
        await newLink.save();
      }

      const { page } = req.params;

      const pagesSchema = await StaticPagesHelper.find();
      var pages = pagesSchema[0];
      const aboutUsPage = pages.aboutUsPage;
      const privacyPolicyPage = pages.privacyPolicyPage;

      if (page == "about-us") {
        return res.status(200).json({
          success: true,
          message: "Pages Retrieved",
          result: {
            aboutUsPage,
          },
        });
      } else if (page == "privacy-policy") {
        return res.status(200).json({
          success: true,
          message: "Pages Retrieved",
          result: {
            privacyPolicyPage,
          },
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Pages Retrieved",
          result: {
            aboutUsPage,
            privacyPolicyPage,
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
  }, // Retrieve Static Pages

  updateStaticPage: async (req, res) => {
    try {
      // Check if the collection is empty
      const checkLink = await StaticPagesHelper.find();
      if (checkLink.length == 0) {
        const newLink = new StaticPagesHelper({
          aboutUsPage: "<h1> About Us </h1>",
          privacyPolicyPage: "<h1> Privacy Policy </h1>",
        });
        await newLink.save();
      }

      var oldPages = await StaticPagesHelper.find();
      oldPages = oldPages[0];

      const { page } = req.params;

      if (page == "about-us") {
        const { content } = req.body;
        await StaticPagesHelper.findByIdAndUpdate(
          { _id: oldPages._id },
          { aboutUsPage: content }
        ).catch((err) => {
          res.status(400).json({
            success: false,
            message: "Can't Update Pages",
            ERROR: err,
          });
        });

        return res.status(200).json({
          success: true,
          message: "Page Updated",
          result: "Page Updated",
        });
      } else if (page == "privacy-policy") {
        const { content } = req.body;
        await StaticPagesHelper.findByIdAndUpdate(
          { _id: oldPages._id },
          { privacyPolicyPage: content }
        ).catch((err) => {
          res.status(400).json({
            success: false,
            message: "Can't Update Pages",
            ERROR: err,
          });
        });

        return res.status(200).json({
          success: true,
          message: "Page Updated",
          result: "Page Updated",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Page Not Found",
          result: "Page Not Found",
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong try again later!",
        ERROR: err,
      });
    }
  }, // Update store link
};
