"use strict";

var express = require("express");
var jwt = require("jsonwebtoken");
var router = express.Router();

var config = require("../config");

module.exports = function(passport) {

	//sends successful login state back to angular
	router.get("/success", function(req, res) {
        var token = jwt.sign(req.user, config.secret, {
            expiresIn: 60 * 24 * 7 // 1 week
        });

        res.json({
            success: true,
            message: "Authentication successfull!",
            token: token,
			user: {
				username: req.user.username,
				role: req.user.role
			}
        });
	});

	//sends failure login state back to angular
	router.get("/failure", function(req, res) {
		res.send({
            success: false,
            message: "Invalid username or password"
        });
	});

	// calls login method defined in passport
	router.post("/login", passport.authenticate("login", {
		successRedirect: "/auth/success",
		failureRedirect: "/auth/failure"
	}));

	// calls signup method defined in passport
	router.post("/signup", passport.authenticate("signup", {
		successRedirect: "/auth/success",
		failureRedirect: "/auth/failure"
	}));

	// log out
	router.get("/logout", function(req, res) {
		req.logout();
		res.redirect("/");
	});

	return router;
};
