const Admin = require("../../../models/Admin");
const { compareSync, hashSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, baseURL } = process.env;
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

module.exports = {
  getAllAdmins: async (req, res) => {
    try {
      const admins = await Admin.find().sort({ _id: -1 });
      res.status(200).json({ success: true, result: admins });
    } catch (err) {
      res.status(500).json({
        success: false,
        ERROR: err,
        message: "Something went wrong try again later!",
      });
    }
  }, // Retrieve All Admins

  adminLogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      const emailLowerCase = email.toLowerCase();

      // Check Email Existance
      const admin = await Admin.findOne({ email: emailLowerCase });
      if (!admin) {
        return res.status(401).json({
          success: false,
          message: "User does not exist!",
        });
      }

      //Incorrect password
      if (!compareSync(password, admin.password)) {
        return res.status(401).json({
          success: false,
          message: "Incorrect Password",
        });
      }

      // Check Activation
      if (!admin.active)
        return res.status(401).json({
          success: false,
          message: "This account has been suspended! Try to contact the admin",
        });

      // Sign a login token
      const payload = {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        photoURL: admin.photoURL,
        active: admin.active,
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "9h" });

      res.status(200).json({
        message: "Login Successful",
        success: true,
        result: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          photoURL: admin.photoURL,
          token: "Bearer " + token,
          active: admin.active,
        },
        token: `Bearer ${token}`,
      });
    } catch (err) {
      res.status(501).send({
        success: false,
        message: "Something went wrong! try again later",
        ERROR: err,
      });
    }
  }, // Admin Login

  addAdmin: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Check password gt 6 chars
      if (password.length < 6)
        return res.status(401).json({
          success: false,
          message: "Password must be 6 characters or more",
        });
      const emailLowerCase = email.toLowerCase();

      // Check Fields not Empty
      if (!name || !email || !password) {
        return res.status(401).json({
          success: false,
          message: "All Fields are Required",
        });
      }

      // Check Email Existance
      const checkEmail = await Admin.findOne({
        email: emailLowerCase,
      });

      if (checkEmail) {
        return res.status(401).json({
          success: false,
          message: "Email Already Registered",
        });
      }

      // Password Encryption
      const hashedPassword = hashSync(password, 10);

      // Create new user schema and save to Database
      const admin = new Admin({
        name,
        email: emailLowerCase,
        password: hashedPassword,
      });
      await admin.save();

      // Respone a Success Message
      res.status(201).json({
        success: true,
        message: "Register Successful",
        result: {
          _id: admin._id,
          name,
          email: admin.email,
          photoURL: admin.photoURL,
          active: admin.active,
        },
      });
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Something went wrong try again later!!",
        ERROR: err,
      });
    }
  }, // Register an Admin

  verifyAdminToken: async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      console.log(
        "🚀 ~ file: adminAuth.js ~ line 140 ~ verifyAdminToken: ~ token",
        token
      );

      const decoded = jwt.verify(token, JWT_SECRET);

      var userId = decoded._id;

      const user = await Admin.findById({ _id: userId });

      if (user)
        return res
          .status(201)
          .json({ success: true, msg: "Already Logged In", admin: user });
      else
        return res.status(401).json({ success: false, msg: "Not Logged In" });
    } catch (err) {
      return res.status(500).json({
        success: false,
        msg: "Internal Server ERROR",
        error: err,
      });
    }
  }, // Check user Token and resend data

  updateAdminStatus: async (req, res) => {
    try {
      const { active } = req.body;
      await Admin.findByIdAndUpdate(req.params.adminId, { active });
      res
        .status(200)
        .json({ success: true, result: { _id: req.params.adminId } });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something Wen Wrong try again later!",
        ERROR: err,
      });
    }
  }, // To update Admins Status form manage admins

  updateProfile: async (req, res) => {
    try {
      const { name } = req.body;
      const { adminId } = req.query;

      const unUpdatedAdmin = await Admin.findById({ _id: adminId });
      const oldPhotoPath = unUpdatedAdmin.photoURL;
      const oldPhotoName = path.basename(oldPhotoPath);

      fs.exists(`public/adminsAvatars/${oldPhotoName}`, function (exists) {
        if (exists) {
          console.log("File exists. Deleting now ... ", oldPhotoName);
          fs.unlinkSync(`public/adminsAvatars/${oldPhotoName}`);
        }
      });

      await sharp(`public/adminsAvatars/${req.file.filename}`)
        .resize({ width: 100 })
        .toFile(`public/adminsAvatars/re-${req.file.filename}`)
        .catch((err) => console.log(err));

      fs.exists(`public/adminsAvatars/${req.file.filename}`, function (exists) {
        if (exists) {
          console.log("File exists. Deleting now ... ", req.file.filename);
          fs.unlinkSync(`public/adminsAvatars/${req.file.filename}`);
        }
      });

      const updatedAdmin = await Admin.findByIdAndUpdate(
        { _id: adminId },
        { name, photoURL: `${baseURL}/adminsAvatars/re-` + req.file.filename },
        {
          new: true,
        }
      );

      // Payload for Token Signing
      const payload = {
        _id: updatedAdmin._id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        photoURL: updatedAdmin.photoURL,
        active: updatedAdmin.active,
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "9h" });
      res.status(200).json({
        success: true,
        result: {
          _id: updatedAdmin._id,
          name: updatedAdmin.name,
          email: updatedAdmin.email,
          photoURL: updatedAdmin.photoURL,
          token: "Bearer " + token,
          active: updatedAdmin.active,
        },
        token: `Bearer ${token}`,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong, Try again later!",
        ERROR: err,
      });
    }
  }, // Update Admin Name and Profile Picture
};
