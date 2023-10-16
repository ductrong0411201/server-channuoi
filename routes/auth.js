const express = require("express");
const router = express.Router();
const AuthController = require("../src/controllers/AuthController");
const auth = require("../src/middlewares/authorizeMiddleware");
const valid = require("../src/middlewares/validationInfo");
const checkAdmin = require("../src/middlewares/checkAdmin");

router.post("/register", valid, AuthController.store);

router.post("/login", valid, AuthController.login);

router.post("/verify", AuthController.checkToken);

router.post("/logout", auth, AuthController.logout);

router.post("/forgot-password", AuthController.forgotPassword);

router.post("/reset-password/:id/:token", AuthController.resetPassword);

router.get("/me", auth, AuthController.getUserInfo);

module.exports = router;