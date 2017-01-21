"use strict";

var express = require("express");
var jwt = require("jsonwebtoken");
var router = express.Router();

var config = require("../config");

module.exports = function(passport) {

	//sends successful login state back to angular
	router.get("/success", function(req, res) {
    var token = jwt.sign(req.user, config.secret, {
      expiresIn: "14d" // 1 week
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

    router.post("/verify", function(req, res) {
        // check header or url parameters or post parameters for token
        // var token = req.body.token || req.query.token || req.headers['x-access-token'];
        var token = req.headers["authorization"];

        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token.substr(7), config.secret, function(err, decoded) {
                if (err) {
                    console.log('Failed to authenticate token.');
                    return res.json({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    return res.json({
                        success: true,
                        message: 'Token is valid.'
                     });
                    // next();
                }
            });

        } else {
            // if there is no token
            // return an error
            console.log('No token provided.');
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });

	return router;
};
