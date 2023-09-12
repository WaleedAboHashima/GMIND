const Users = require("../Models/Users");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
require("dotenv").config();

passport.serializeUser(function (user, done) {
  // done(null, user.id);
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  // Users.findById(obj, done);
  done(null, obj);
}); // passport-google

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.baseURL}:${process.env.PORT}/api/google/callback`,
    },
    async function (accessToken, refreshToken, profile, done) {
      const email = profile.emails[0].value;
      const firstName = profile.name.givenName;
      const lastName = profile.name.familyName;
      const photo = profile.photos[0].value;
      // Query the database to find user record associated with this
      // google profile, then pass that object to done callback
      const currentUser = await Users.findOne({ email: email });

      if (!currentUser) {
        const newUser = new Users({
          firstName: firstName,
          lastName: lastName,
          email: email,
          photo: photo,
          authType: "google",
        });
        await newUser.save();
        return done(null, true, { msg: "new user created" });
      }

      if (currentUser.authType != "google") {
        //return error
        return done(null, false, {
          msg: `You have previously signed up with a different signin method`,
        });
      }
      return done(null, true, { msg: "login success" });
    }
  )
); // passport-google-oauth20 strategy

module.exports = { passport: passport };
