const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const {
  register,
  login,
  forgotPassword,
  checkToken,
  deleteUser,
  checkConsecutiveLogin,
} = require("../controllers");
const {
  ForgetHandler,
  OTPCheck,
  VerifyHuman,
  HumanOTPCheck,
} = require("../controllers/auth/forget");
const { UpdatePassword } = require("../controllers/auth/change-password");
const imgUploader = require("../middlewares/imgUploader");
// @Desc Register a User
// @Resquest [POST]
// @Route /api/auth/register
router.post(
  "/register",
  imgUploader.fields([{ name: "image", maxCount: 1 }]),
  register
);

router.post("/register/verify", VerifyHuman);
router.post("/register/otp", HumanOTPCheck);

// @Desc Check Consecutive logged days
// @Resquest [POST]
// @Route /api/auth/check-consecutive/:userId
router.get("/check-consecutive/:userId", checkConsecutiveLogin);

// @Desc Login a User
// @Resquest [POST]
// @Route /api/auth/login
router.post("/login", login);

// @Desc Change Password
// @Resquest [POST]
// @Route /api/auth/change-password
router.post("/reset/:id", UpdatePassword);

// @Desc Forgot Password
// @Resquest [POST]
// @Route /api/auth/forgot-password

// router.post("/forgot-password", forgotPassword);

// @Desc Reseyt Forgot Password
// @Resquest [POST]
// @Route /api/auth/forgot-password/:resetToken

// router.put("/forgot-password/:resetToken", resetPassword);

// @Desc Check Token
// @Resquest [POST]
// @Route /api/auth/token
router.post("/token", verifyToken, checkToken);

// @Desc Delete a User
// @Resquest [DELETE]
// @Route /api/auth/delete-user
router.delete("/delete-user", deleteUser);

router.post("/forget", ForgetHandler);
router.post("/otp", OTPCheck);

module.exports = router;
