const env = require("dotenv");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const conn = require("./conn.mysql")

env.config({
  path: "./config/config.env"
});

module.exports = (passport) => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  }, async (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
  }));
}