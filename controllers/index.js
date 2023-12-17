const { register } = require("./auth/register");
const { login, checkToken, checkConsecutiveLogin } = require("./auth/login");
const {
  changePassword,
  forgotPassword,
  resetPassword,
} = require("./auth/change-password");
const { deleteUser } = require("./auth/deleteUser");
const { profileUpdate, imageUpdate, getAvatars, getProfile, deleteProfile } = require("./profileUpdate");
const {
  getCategories,
  addCategory,
  updateCategory,
  uploadCategoryImage,
} = require("./categories/category");
const {
  getLevels,
  addLevel,
  updateLevel,
  uploadLevelImage,
} = require("./categories/level");
const {
  getQuestions,
  addQuestionBody,
  getQuestinOption,
  addQuestionOption,
  deleteQuestionOption,
  updateQuestion,
  updateAnswer,
} = require("./categories/question");

const {
  getRandomQuestions,
  addRandomQuestionBody,
  getRandomQuestinOption,
  addRandomQuestionOption,
  deleteRandomQuestionOption,
  updateRandomQuestion,
  updateRandomAnswer,
  getARandomQuestion,
} = require("./categories/randomQuestions");

const {
  getAllUsers,
  updateUserStatus,
  updateUserPoints,
  deductUserPoints,
  incrementUserLevel,
  getUserCategoryLevels,
  deleteAdmin,
} = require("./dashboard/users/users");
const {
  adminLogin,
  addAdmin,
  verifyAdminToken,
  getAllAdmins,
  updateAdminStatus,
  updateProfile,
} = require("./dashboard/admins/adminAuth");

const { getAllFeedbacks, addFeedback } = require("./dashboard/feedback");

const {
  getCompetitionCategories,
  addCompetitionCategory,
  updateCompetitionCategory,
  uploadCompetitionCategoryImage,
} = require("./competitions/category");

const {
  getCompetitionLevels,
  addCompetitionLevel,
  updateCompetitionLevel,
  uploadCompetitionLevelImage,
} = require("./competitions/level");

const {
  getCompetitionQuestions,
  addCompetitionQuestionBody,
  getCompetitionQuestinOption,
  addCompetitionQuestionOption,
  deleteCompetitionQuestionOption,
  updateCompetitionQuestion,
  updateCompetitionAnswer,
} = require("./competitions/question");

const {
  getCompetitionWinners,
  addCompetitionWinners,
  updateCompetitionWinnerStatus,
  deleteCompetitionWinner,
} = require("./competitions/winners");

const {
  getCompetitionRandomQuestions,
  addCompetitionRandomQuestionBody,
  getCompetitionRandomQuestinOption,
  addCompetitionRandomQuestionOption,
  deleteCompetitionRandomQuestionOption,
  updateCompetitionRandomQuestion,
  updateCompetitionRandomAnswer,
  getCompetitionARandomQuestion,
} = require("./competitions/randomQuestions");

const {
  pushNotification,
  getNotifications,
} = require("./challenges/notifications");

const {
  getChallengeQuestions,
  addChallengeQuestionBody,
  getChallengeQuestinOption,
  addChallengeQuestionOption,
  deleteChallengeQuestionOption,
  updateChallengeQuestion,
  updateChallengeAnswer,
} = require("./challenges/question");

const {
  toggleChallengeStatus,
  checkChallengeAndGetQuestions,
  updateChallengeGift,
} = require("./challenges/toggleStatus");

const {
  addChallengeWinners,
  getChallengeRank,
} = require("./challenges/winners");

const { getLeaderBoard } = require("./rank/leaderBoard");

const {
  getStoreLink,
  updateStoreLink,
} = require("./staticPagesHelper/rateApp");

const {
  getStaticPage,
  updateStaticPage,
} = require("./staticPagesHelper/staticPages");

const {
  getRedeemRequests,
  addGoldReedeem,
  updateRedeemGoldStatus,
  deleteRedeemRequest,
} = require("./gold/redeem");

const {
  completedLevel
} = require('./points')

module.exports = {
  register,
  login,
  changePassword,
  forgotPassword,
  completedLevel,
  resetPassword,
  deleteUser,
  checkToken,
  profileUpdate,
  imageUpdate,
  getCategories,
  addCategory,
  updateCategory,
  getLevels,
  addLevel,
  updateLevel,
  uploadLevelImage,
  getQuestions,
  addQuestionBody,
  updateQuestion,
  getQuestinOption,
  addQuestionOption,
  deleteQuestionOption,
  updateAnswer,
  getAllUsers,
  getAllAdmins,
  adminLogin,
  addAdmin,
  uploadCategoryImage,
  verifyAdminToken,
  updateAdminStatus,
  updateProfile,
  updateUserStatus,
  getRandomQuestions,
  addRandomQuestionBody,
  getRandomQuestinOption,
  addRandomQuestionOption,
  deleteRandomQuestionOption,
  updateRandomQuestion,
  updateRandomAnswer,
  getARandomQuestion,
  getAllFeedbacks,
  addFeedback,
  updateUserPoints,
  getCompetitionCategories,
  addCompetitionCategory,
  updateCompetitionCategory,
  uploadCompetitionCategoryImage,
  getCompetitionLevels,
  addCompetitionLevel,
  updateCompetitionLevel,
  uploadCompetitionLevelImage,
  getCompetitionQuestions,
  addCompetitionQuestionBody,
  getCompetitionQuestinOption,
  addCompetitionQuestionOption,
  deleteCompetitionQuestionOption,
  updateCompetitionQuestion,
  updateCompetitionAnswer,
  getCompetitionWinners,
  addCompetitionWinners,
  updateCompetitionWinnerStatus,
  deleteCompetitionWinner,
  getCompetitionRandomQuestions,
  addCompetitionRandomQuestionBody,
  getCompetitionRandomQuestinOption,
  addCompetitionRandomQuestionOption,
  deleteCompetitionRandomQuestionOption,
  updateCompetitionRandomQuestion,
  updateCompetitionRandomAnswer,
  getCompetitionARandomQuestion,
  pushNotification,
  getNotifications,
  getChallengeQuestions,
  addChallengeQuestionBody,
  getChallengeQuestinOption,
  addChallengeQuestionOption,
  deleteChallengeQuestionOption,
  updateChallengeQuestion,
  updateChallengeAnswer,
  getProfile,
  toggleChallengeStatus,
  checkChallengeAndGetQuestions,
  updateChallengeGift,
  addChallengeWinners,
  getLeaderBoard,
  getChallengeRank,
  deleteProfile,
  getStoreLink,
  updateStoreLink,
  getStaticPage,
  updateStaticPage,
  getRedeemRequests,
  addGoldReedeem,
  updateRedeemGoldStatus,
  deleteAdmin,
  deleteRedeemRequest,
  getAvatars,
  checkConsecutiveLogin,
  deductUserPoints,
  incrementUserLevel,
  getUserCategoryLevels,
};
