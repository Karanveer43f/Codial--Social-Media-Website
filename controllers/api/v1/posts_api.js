const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = async function (req, res) {
  let posts = await Post.find({})
    .sort("-createdAt")
    .populate({
      path: "user",
      select: "-password",
    })
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "-password",
      },
    });

  return res.json(200, {
    message: "List of Posts",
    posts: posts,
  });
};

module.exports.destroy = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);
    post.remove();

    await Comment.deleteMany({ post: req.params.id });

    return res.json(200, {
      message: `Post ${post.content}  has been deleted`,
    });
  } catch (err) {
    return res.json(500, {
      message: `Internal Server Error`,
    });
  }
};
