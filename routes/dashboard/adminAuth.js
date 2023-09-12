const router = require("express").Router();
const { adminPhotoUpload } = require("../../middlewares/adminPhotoUpload");
const {
  adminLogin,
  addAdmin,
  verifyAdminToken,
  getAllAdmins,
  updateAdminStatus,
  updateProfile,
} = require("../../controllers");

// @Desc Get All Admins
// @Resquest [GET]
// @Route /api/dashboard/admin/all
router.get("/all", getAllAdmins);

// @Desc Admin Login
// @Resquest [POST]
// @Route /api/dashboard/admin/login
router.post("/login", adminLogin);

// @Desc Admin Register
// @Resquest [POST]
// @Route /api/dashboard/admin/register
router.post("/register", addAdmin);

// @Desc Admin Register
// @Resquest [GET]
// @Route /api/dashboard/admin/verify-token
router.get("/verify-token", verifyAdminToken);

// @Desc Update Admin Status from Manage Admins
// @Resquest [PATCH]
// @Route /api/dashboard/admin/update-status/:adminId
router.patch("/update-status/:adminId", updateAdminStatus);

// @Desc Update Admin Name and Photo
// @Resquest [PATCH]
// @Route /api/dashboard/admin/update-profile
router.patch("/update-profile", adminPhotoUpload, updateProfile);

module.exports = router;
