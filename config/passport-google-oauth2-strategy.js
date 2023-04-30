const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/users");

passport.use(
  new googleStrategy(
    {
      clientID:
        "336529846577-ue787mpkfs3b15nlf8dvfu3slg67qqfu.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("Error in google strategy-passport", err);
          return;
        }

        console.log(profile);
        if (user) {
          //if found, set this user as req.user
          return done(null, user);
        } else {
          //if not found, create the user and set is as req.user(sign in the user)
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log(
                  "Error in creating user using google strategy-passport",
                  err
                );
                return;
              }

              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
