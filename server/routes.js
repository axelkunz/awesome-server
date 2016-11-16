'use strict';

var express = require('express');
var router = express.Router();
var Post = require('./models/post');
var GeoJson = require('./models/feature');
var User = require('./models/user');

router.get('/features', function (req, res) {
    GeoJson.find({}, function(err, features) {
        if (err) {
            throw err;
        }
        res.json(features);
    });
});

router.get('/features/:id', function (req, res) {
    var id = req.params.id;
    GeoJson.findOne({ _id: id }, function(err, feature) {
        if (err) {
            throw err;
        }
        res.json(feature);
    });
});

router.post('/features', function (req, res) {
    var feature = req.body;
    GeoJson.create(feature, function(err, feature) {
        if (err) {
            throw err;
        }
        res.json(feature);
    });
});

router.delete('/features/:id', function (req, res) {
    var id = req.params.id;
    GeoJson.findOneAndRemove({ _id: id }, function(err, feature) {
        if (err) {
            throw err;
        }
        res.json(feature);
    });
});

router.get('/posts', function (req, res) {
    Post.find({}, function(err, posts) {
        if (err) {
            throw err;
        }
        res.json(posts);
    });
});

router.get('/posts/:id', function (req, res) {
    var id = req.params.id;
    Post.findOne({ _id: id }, function(err, post) {
        if (err) {
            throw err;
        }
        res.json(post);
    });
});

router.post('/posts', function (req, res) {
    var post = req.body;
    Post.create(post, function(err, post) {
        if (err) {
            throw err;
        }
        res.json(post);
    });
});

router.put('/posts/:id', function (req, res) {
    var id = req.params.id;
    var post = req.body;
    var update = {
         title: post.title,
         text: post.text,
         comments: post.comments,
         published: post.published
    };
    Post.findOneAndUpdate({_id: id}, update, function(err, post) {
        if (err) {
            throw err;
        }
        res.json(post);
    });
});

router.delete('/posts/:id', function (req, res) {
    var id = req.params.id;
    Post.findOneAndRemove({ id: id }, function(err, post) {
        if (err) {
            throw err;
        }
        res.json(post);
    });
});

router.get('/users', function (req, res) {
    User.find({}, function(err, users) {
        if (err) {
            throw err;
        }
        res.json(users);
    });
});

router.get('/users/:id', function (req, res) {
    var id = req.params.id;
    User.findOne({ _id: id }, function(err, user) {
        if (err) {
            throw err;
        }
        res.json(user);
    });
});

router.post('/users', function (req, res) {
    var user = req.body;
    User.create(user, function(err, user) {
        if (err) {
            throw err;
        }
        res.json(user);
    });
});

router.delete('/users/:id', function (req, res) {
    var id = req.params.id;
    User.findOneAndRemove({ id: id }, function(err, user) {
        if (err) {
            throw err;
        }
        res.json(user);
    });
});

module.exports = router;
