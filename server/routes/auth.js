"use strict";

var express = require("express");
var jwt = require("jsonwebtoken");
var router = express.Router();

var config = require("../config");

module.exports = function(passport) {

	router.get("/success", function(req, res) {
    var token = jwt.sign(req.user, config.secret, {
      expiresIn: "14d"
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

	router.get("/logout", function(req, res) {
		req.logout();
		res.redirect("/");
	});

  router.post("/verify", function(req, res) {
    var token = req.headers["authorization"];
    if (token) {
      jwt.verify(token.substr(7), config.secret, function(err, decoded) {
        if (err) {
          return res.json({
              success: false,
              message: 'Failed to authenticate token.'
          });
        } else {
          return res.json({
            success: true,
            message: 'Token is valid.'
          });
        }
      });
    } else {
      return res.status(403).send({
          success: false,
          message: 'No token provided.'
      });
    }
  });
	return router;
};
