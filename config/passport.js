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
    const user = {
      id: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName
    };

    conn.query("SELECT * FROM Users WHERE id = ?", user.id, (err, rows) => {
      if (rows.length) {
        cb(err, user);
      } else {
        const row = [user.id, user.displayName, user.firstName, user.lastName];
        conn.query("INSERT INTO Users VALUES (?, ?, ?, ?)", row, (err) => {
          cb(err, user)
        });
      }
    });
  }));

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    conn.query("SELECT * FROM Users WHERE id = ?", id, (err, rows) => {
      const user = rows[0];
      cb(err, user);
    });
  });
};