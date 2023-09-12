const multer = require("multer");
const path = require("path");

const multerConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join((__dirname, "public/competitionImages")));
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split("/")[1];
    callback(
      null,
      `image-${Math.floor(Math.random() * 1000)}${Date.now()}.${ext}`
    );
  },
});

const imageFilter = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) callback(null, true);
  else callback(new Error("Only Images is Allowed ...."));
};

const upload = multer({
  storage: multerConfig,
  fileFilter: imageFilter,
});

exports.competitionImageUpload = upload.single("image");
