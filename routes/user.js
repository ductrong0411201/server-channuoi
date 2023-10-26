const express = require("express");
const router = express.Router();
const UserController = require("../src/controllers/UserController");
const auth = require("../src/middlewares/authorizeMiddleware");

router.post("/update-user-info", auth, UserController.updateUserInfo);

module.exports = router;
