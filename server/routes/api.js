"use strict";

var fs = require("fs");
var express = require("express");
var router = express.Router();
var Post = require("../models/post");
var GeoJson = require("../models/feature");
var User = require("../models/user");
var _ = require("lodash-node");
var jwt = require("jsonwebtoken");
var config = require("../config");

// authorization middleware
router.get("*", function(req, res, next) {

    // check header or url parameters or post parameters for token
    // var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var token = req.headers["authorization"];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token.substr(7), config.secret, function(err, decoded) {
            if (err) {
                return res.status(403).send({
                    success: false,
                    message: "Failed to authenticate token."
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: "No token provided."
        });
    }
});

router.get("/features", function(req, res) {
    GeoJson.find({}, function(err, features) {
        if (err) {
            throw err;
        }
        res.json(features);
    });
});

router.get("/features/:id", function (req, res) {
    var id = req.params.id;
    GeoJson.findOne({ _id: id }, function(err, feature) {
        if (err) {
            throw err;
        }
        res.json(feature);
    });
});

router.post("/features", function (req, res) {
    var feature = req.body;
    GeoJson.create(feature, function(err, feature) {
        if (err) {
            throw err;
        }
        res.json(feature);
    });
});

router.delete("/features/:id", function (req, res) {
    var id = req.params.id;
    GeoJson.findOneAndRemove({ _id: id }, function(err, feature) {
        if (err) {
            throw err;
        }
        res.json(feature);
    });
});

router.get("/posts", function (req, res) {
    Post.find({}, function(err, posts) {
        if (err) {
            throw err;
        }
        res.json(posts);
    });
});

router.get("/posts/:id", function (req, res) {
    var id = req.params.id;
    Post.findOne({ _id: id }, function(err, post) {
        if (err) {
            throw err;
        }
        res.json(post);
    });
});

router.post("/posts", function (req, res) {
    var post = req.body;
    Post.create(post, function(err, post) {
        if (err) {
            throw err;
        }
        res.json(post);
    });
});

router.put("/posts/:id", function (req, res) {
    var id = req.params.id;
    var post = req.body;
    var update = {
         title: post.title,
         subtitle: post.subtitle,
         text: post.text,
         comments: post.comments,
         likes: post.likes,
         published: post.published,
         publishedAt: post.publishedAt,
         viewCount: post.viewCount
    };
    Post.findOneAndUpdate({_id: id}, update, function(err, post) {
        if (err) {
            throw err;
        }
        res.json(post);
    });
});

router.delete("/posts/:id", function (req, res) {
    var id = req.params.id;
    Post.findOneAndRemove({ id: id }, function(err, post) {
        if (err) {
            throw err;
        }
        res.json(post);
    });
});

router.get("/users", function (req, res) {
    User.find({}, "username role readPosts", function(err, users) {
        if (err) {
            throw err;
        }
        res.json(users);
    });
});

router.get("/users/:id", function (req, res) {
    var id = req.params.id;
    User.findOne({ _id: id }, "username role readPosts", function(err, user) {
        if (err) {
            throw err;
        }
        res.json(user);
    });
});

router.post("/users", function (req, res) {
    var user = req.body;
    User.create(user, function(err, user) {
        if (err) {
            throw err;
        }
        res.json(user);
    });
});

router.put("/users/:id", function (req, res) {
    var id = req.params.id;
    var user = req.body;
    var update = {
        username: user.username,
        role: user.role,
        readPosts: user.readPosts
    };
    User.findOneAndUpdate({_id: id}, update, function(err, user) {
        if (err) {
            throw err;
        }
        res.json(user);
    });
});

router.delete("/users/:id", function (req, res) {
    var id = req.params.id;
    User.findOneAndRemove({ _id: id }, function(err, user) {
        if (err) {
            throw err;
        }
        res.json(user);
    });
});

/**
 * @param {string} foldername
 */
router.get("/pictures/:dirname", function (req, res) {
    var dirname = req.params.dirname;
    fs.readdir(__dirname + "/../public/images/" + dirname, function(err, files) {
        if (err) {
            return res.status(404).send({
                message: err
            });
        }
        res.json(files);
    });
});

module.exports = router;
