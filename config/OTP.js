const mailer = require("nodemailer");
const { VsAuthenticator } = require("@vs-org/authenticator");
const OTPCashe = {};
const {nodemailer_user, nodemailer_pass} = process.env
exports.SendOTP = async (email) => {
  const code = VsAuthenticator.generateTOTP(process.env.OTP_SECRET);
  OTPCashe[code] = email;

  const transporter = new mailer.createTransport({
    service: "gmail",
    auth: {
      user: nodemailer_user,
      pass: nodemailer_pass,
    },
  });
  const options = {
    from: nodemailer_user,
    to: `${email}`,
    subject: "Reset Password Request From OurStores.",
    text: `Your OTP is ${code}  Valid For 60 min`,
  };
  return await transporter.sendMail(options);
};

exports.VerifyOTP = async (OTP, email) => {
  const cashedEmail = OTPCashe[OTP];
  if (cashedEmail === email) {
    VsAuthenticator.verifyTOTP(OTP, process.env.OTP_SECRET);
    delete OTPCashe[OTP];
    return true;
  }
  else {
    throw new Error("Invalid Email Or OTP")
  }
};
