const router = require("express").Router();

const { profileUpdate, imageUpdate, getAvatars } = require("../controllers");

// @Desc Update Profile Data
// @Resquest [POST]
// @Route /api/profile/update
router.post("/update", profileUpdate);

// @Desc Update User Image
// @Resquest [POST]
// @Route /api/profile/update/image
router.post("/update/image", imageUpdate);

// @Desc Get Avatars List
// @Resquest [GET]
// @Route /api/profile/avatar/all
router.get("/avatar/all", getAvatars);

module.exports = router;
