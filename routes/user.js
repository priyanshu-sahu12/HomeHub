const express = require('express');
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');

const userController = require('../controllers/users.js');

router
.route("/signup")
.get( userController.showSignupForm )
.post( wrapAsync(userController.signupUser));

router
.route("/login")
.get( userController.showLoginForm)
.post( saveRedirectUrl, passport.authenticate("local", {failureRedirect: '/login', failureFlash: true}) , userController.loginUser);

router.get("/logout", userController.logOutUser);

module.exports = router;