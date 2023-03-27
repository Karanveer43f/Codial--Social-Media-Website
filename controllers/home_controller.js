const Posts = require("../models/post");

module.exports.home = function (req, res) {
  // Posts.find({}, function (err, posts) {
  //   if (err) {console.log("Error in fetching the posts");return;}

  //   return res.render("home", {
  //     title: "Home",
  //     posts: posts,
  //   });
  // });

  // If we want to show the user's name along side the post , we have to populate the user first

  Posts.find({})
    .populate("user")
    .exec(function (err, posts) {
      if (err) {
        console.log("Error in fetching the posts");
        return;
      }

      return res.render("home", {
        title: "Home",
        posts: posts,
      });
    });
};

//module.exports.actionName = function(req, res){};
