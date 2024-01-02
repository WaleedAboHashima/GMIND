const expressAsyncHandler = require("express-async-handler");
const WORDSEARCH = require("../../models/wordsearch");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

exports.AddQuestionToWordSearch = expressAsyncHandler(async (req, res) => {
  const { question, answer, prize } = req.body;
  const { image } = req.files;
  try {
    if (image) {
      const uploadedImage = (await cloudinary.uploader.upload(image[0].path))
        .secure_url;
      if (question) {
        answer_def = answer ? answer.split("") : [];
        await WORDSEARCH.create({
          image: uploadedImage,
          question,
          answer,
          answer_def,
          // answer_def: answer.split(""),
          prize,
        });
      } else {
        await WORDSEARCH.create({
          image: uploadedImage,
          answer,
          answer_def,
          // answer_def: answer.split(""),
          prize,
        });
      }
    } else {
      await WORDSEARCH.create({
        question,
        answer,
        answer_def: answer.split(""),
        prize,
      });
    }
    res
      .status(200)
      .json({ success: true, message: "Question added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const getRandomArabicLetter = () => {
  // Replace this array with your desired set of Arabic letters
  const arabicLetters = [
    "ء",
    "آ",
    "أ",
    "ؤ",
    "إ",
    "ئ",
    "ا",
    "ب",
    "ت",
    "ث" /*...*/,
  ];
  return arabicLetters[Math.floor(Math.random() * arabicLetters.length)];
};

exports.GetQuestions = expressAsyncHandler(async (req, res) => {
  try {
    const questions = await WORDSEARCH.find({});

    // Modify answer_def for each question
    const modifiedQuestions = questions.map((question) => {
      const { answer_def, answer } = question;

      // Add 5 random Arabic letters to answer_def array
      for (let i = 0; i < 5; i++) {
        answer_def.push(getRandomArabicLetter());
      }

      shuffleArray(answer_def);

      return {
        ...question.toObject(),
        answer_def,
      };
    });

    res.status(200).json({
      message: "Questions returned successfully",
      questions: modifiedQuestions,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

exports.DeleteQuestion = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  await WORDSEARCH.findByIdAndDelete(id);
  res
    .status(200)
    .json({ success: true, message: "Question deleted successfully" });
});

exports.EditQuestion = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { question, answer, prize } = req.body;
  const updatedFields = {};
  if (question) updatedFields.question = question;
  if (answer) updatedFields.answer = answer;
  if (prize) updatedFields.prize = prize;
  await WORDSEARCH.findByIdAndUpdate(id, updatedFields, { new: true });
  res
    .status(200)
    .json({ success: true, message: "Question updated successfully" });
});
