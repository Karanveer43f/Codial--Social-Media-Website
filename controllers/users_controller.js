module.exports.profile = function (req, res) {
  res.end("<h1>User Profile</h1>");
};

module.exports.posts = function (req, res) {
  res.end("<h1>Posts by the User</h1>");
};
