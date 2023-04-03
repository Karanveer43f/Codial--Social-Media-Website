const User = require("../models/users");

module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    res.render("user_profile", {
      title: "Profile",
      profile_user: user,
    });
  });
};

module.exports.update = function (req, res) {
  if (req.user.id == req.params.id) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
      return res.redirect("back");
    });
  } else {
    return res.status(401).send("Unauthorised");
  }
};
module.exports.posts = function (req, res) {
  res.render("user_posts", {
    title: "Posts",
  });
};
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  res.render("user_sign_in", {
    title: "Codial | Sign In",
  });
};

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

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
  req.flash("success", "logged in Successfully");
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  //in the coding ninjas video , the destroy session works by just calling it, no call back function required
  // but in the latest version, it requires a callback function
  req.logout(function (err) {
    if (err) {
      console.log(err);
    }
  });

  req.flash("success", "logged out Successfully");
  return res.redirect("/");
};
