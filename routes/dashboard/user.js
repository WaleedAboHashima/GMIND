const router = require("express").Router();

const {
  getAllUsers,
  updateUserStatus,
  updateUserPoints,
  deductUserPoints,
  incrementUserLevel,
  getUserCategoryLevels,
} = require("../../controllers");

// @Desc Fetch All Users
// @Resquest [GET]
// @Route /api/dashboard/user/all
router.get("/all", getAllUsers);

// @Desc Update User Status from Manage Users
// @Resquest [PATCH]
// @Route /api/dashboard/user/update-status/:userId
router.patch("/update-status/:userId", updateUserStatus);

// @Desc Update User points
// @Resquest [PATCH]
// @Route /api/dashboard/user/update-status/:userId
router.patch("/update-points/:userId", updateUserPoints);

// @Desc Deduct User points
// @Resquest [PATCH]
// @Route /api/dashboard/user/deduct-status/:userId
router.patch("/deduct-points/:userId", deductUserPoints);

// @Desc Level user up
// @Resquest [PATCH]
// @Route /api/dashboard/user/level-up/:userId
router.patch("/level-up/:userId", incrementUserLevel);

// @Desc Get Category Levels for a User
// @Resquest [POST]
// @Route /api/dashboard/user/get-category-levels/:userId
router.post("/get-category-levels/:userId", getUserCategoryLevels);

module.exports = router;
