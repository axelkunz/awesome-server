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
var authRoutes = require("./routes/auth")(passport);
var jwt = require("jsonwebtoken");
var mongoose = require("mongoose");

var config = require("./config");

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
app.use("/api", apiRoutes);

// make angular's path locationstrategy work
function redirectRouterLessonUnmatched(req,res) {
    res.sendFile("index.html", { root: './index.html' });
}

app.use(redirectRouterLessonUnmatched);

app.use(express.static(path.join(__dirname, "../", "dist")));
app.use(express.static(__dirname + "/public"));  // serve pictures

app.listen(port, function () {
    console.log("Server listening on port " + port + "!");
});
