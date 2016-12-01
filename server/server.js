"use strict";

var path = require("path");
var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var logger = require("morgan");
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
var compression = require("compression");
var cors = require("cors");
var apiRoutes = require("./routes/api");
var imageRoutes = require("./routes/image");
var authRoutes = require("./routes/auth")(passport);
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var config = require('./config');

// middleware
app.use(cors());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// auhentication
var initPassport = require("./passport-init");
initPassport(passport);

app.use(compression());  // compress static content using gzip
app.use(logger("dev"));  // morgan
app.use(session({
    secret: "everything is awesome!",
    resave: true,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, "../", "dist")));
app.use(express.static(__dirname + "/public"));  // serve pictures

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

// connect to db
var db = process.env.MONGO_URI || config.database;
mongoose.connect(db, function(err) {
    if (err) {
        console.log("couldn't connect to mongodb!");
        console.log(err);
    } else {
        console.log("connected to mongodb successfully!");
    }
});

// security
// app.disable("x-powered-by");

// routes
app.use("/auth", authRoutes);

// check JWT for api routes
app.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    // var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var token = req.headers["authorization"];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token.substr(7), config.secret, function(err, decoded) {
            if (err) {
                console.log('Failed to authenticate token.');
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
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

app.use("/api", apiRoutes);
// app.use(imageRoutes);

app.listen(port, function () {
    console.log("Server listening on port " + port + "!");
});
