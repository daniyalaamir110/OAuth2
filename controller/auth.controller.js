const passport = require("passport");

exports.authGoogle = passport.authenticate("google", {
  scope: [
    "profile",
  ]
});

exports.authGoogleFailure = passport.authenticate("google", {
  failureRedirect: "/"
});

exports.authGoogleCallback = async (req, res) => {
  res.redirect("/");
};