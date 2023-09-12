const router = require("express").Router();

const { getStoreLink, updateStoreLink, getStaticPage, updateStaticPage } = require("../../controllers");

// @Desc get app store links based on platform
// @Resquest [GET]
// @Route /api/static-pages-handler/store-link/:platform
router.get("/store-link/:platform", getStoreLink);

// @Desc update app store links
// @Resquest [PATCH]
// @Route /api/static-pages-handler/update-store-link
router.patch("/update-store-link", updateStoreLink);


// @Desc get static page based on page type
// @Resquest [GET]
// @Route /api/static-pages-handler/get-page/:page
router.get("/get-page/:page", getStaticPage);

// @Desc update static page based on page type
// @Resquest [PATCH]
// @Route /api/static-pages-handler/update-page/:page
router.patch("/update-page/:page", updateStaticPage);

module.exports = router;
