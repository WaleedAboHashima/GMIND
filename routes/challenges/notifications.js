const router = require("express").Router();

const { pushNotification, getNotifications } = require("../../controllers");

// @Desc Push Notification to All Users
// @Resquest [POST]
// @Route /api/challenge/notifications/all
router.post("/all", pushNotification);

// @Desc get all notifications
// @Resquest [GET]
// @Route /api/challenge/notifications/all
router.get("/all", getNotifications);

module.exports = router;
