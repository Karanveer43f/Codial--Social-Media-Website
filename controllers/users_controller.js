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

module.exports.login = function (req, res) {
  res.render("user_login", {
    title: "User Login",
  });
};
