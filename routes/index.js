const router = require("express").Router();

// @Desc Default API
// @Resquest [GET]
// @Route /api/
router.get("/", (req, res) => {
  return res.status(200).send("<h1>This is Quiz App Server Get Out.!!!</h1>");
});

// @Desc Auth APIs
// @Resquest [ALL]
// @Route /api/auth
router.use("/auth", require("./auth"));

// @Desc Profile APIs
// @Resquest [ALL]
// @Route /api/profile
router.use("/profile", require("./profileUpdate"));

// @Desc CAtegories APIs
// @Resquest [ALL]
// @Route /api/category
router.use("/category", require("./categories/category"));

// @Desc Categories Levels APIs
// @Resquest [ALL]
// @Route /api/category/level
router.use("/category/level", require("./categories/level"));

// @Desc Categories Questions APIs
// @Resquest [ALL]
// @Route /api/category/question
router.use("/category/question", require("./categories/question"));

// @Desc Competition Categories APIs
// @Resquest [ALL]
// @Route /api/competition
router.use("/competition", require("./competitions/category"));

// @Desc Competition Categories Levels APIs
// @Resquest [ALL]
// @Route /api/competition/level
router.use("/competition/level", require("./competitions/level"));

// @Desc competition Categories Questions APIs
// @Resquest [ALL]
// @Route /api/competition/question
router.use("/competition/question", require("./competitions/question"));

// @Desc competition Winners APIs
// @Resquest [ALL]
// @Route /api/competition/winners
router.use("/competition/winners", require("./competitions/winners"));

// @Desc Challenges APIs
// @Resquest [ALL]
// @Route /api/challenge
router.use("/challenge", require("./challenges"));

// @Desc Random Questions for Competitions APIs
// @Resquest [ALL]
// @Route /api/competition/random-question
router.use(
  "/competition/random-question",
  require("./competitions/randomQuestions")
);

// @Desc Random Questions APIs
// @Resquest [ALL]
// @Route /api/category/random-question
router.use(
  "/category/random-question",
  require("./categories/randomQuestions")
);

// @Desc Dashboard APIs
// @Resquest [ALL]
// @Route /api/dashboard
router.use("/dashboard", require("./dashboard"));

// @Desc Rank APIs
// @Resquest [ALL]
// @Route /api/rank
router.use("/rank", require("./rank"));

// @Desc Static Pages APIs
// @Resquest [ALL]
// @Route /api/static-pages-handler
router.use("/static-pages-handler", require("./staticPagesHandler"));

// @Desc Gold Redeemption APIs
// @Resquest [ALL]
// @Route /api/redeem-gold
router.use("/redeem-gold", require("./gold/redeem"));

router.use("/points", require('./points'));
router.use('/wheel', require('./wheel'))
router.use('/wordsearch' , require('./wordsearch'));
module.exports = router;
