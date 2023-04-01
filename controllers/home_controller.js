const { populate } = require("../models/post");
const Posts = require("../models/post");
const User = require('../models/users')
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
    .populate({
      path: 'comments',
      populate:{
        path:'user'
      }
    })
    .exec(function (err, posts) {
      if (err) {
        console.log("Error in fetching the posts");
        return;
      }

      User.find({} , function(err , users){
        return res.render("home", {
          title: "Home",
          posts: posts,
          all_users: users
        });
      })
    });
};

//module.exports.actionName = function(req, res){};
