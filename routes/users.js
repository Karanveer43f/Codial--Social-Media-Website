const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users_controller");

router.get("/profile", usersController.profile);
router.get("/posts", usersController.posts);
router.get("login" , usersController.login);

module.exports = router;
