const User = require("../models/users");

module.exports.profile = function (req, res) {
  res.render("user_profile", {
    title: "Profile",
  });
};
module.exports.posts = function (req, res) {
  res.render("user_posts", {
    title: "Posts",
  });
};
module.exports.signIn = function (req, res) {
  res.render("user_sign_in", {
    title: "Codial | Sign In",
  });
};

module.exports.signUp = function (req, res) {
  res.render("user_sign_up", {
    title: "Codial | SignUp",
  });
};

// Get the signup data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    console.log("Password and confirm Password do not match");
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding the user in signing up");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("Error in creating the user in signing up");
          return;
        }

        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

// sign in and create sessions for user
module.exports.createSession = function (req, res) {
  return res.redirect('/')
};
