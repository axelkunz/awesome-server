"use strict";

var path = require("path");
var express = require("express");
var app = express();
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

// auhentication
var initPassport = require("./passport-init");
initPassport(passport);

// middleware
app.use(cors());
app.use(compression());  // compress static content using gzip
app.use(logger("dev"));  // morgan
app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// connect to db
var db = process.env.MONGO_URI || config.database;
mongoose.connect(db, { useMongoClient: true }, function(err) {
  if (err) {
    console.log("couldn't connect to mongodb!");
    throw err;
  } else {
    console.log("connected to mongodb successfully!");
  }
});

app.get("/hello", function(req, res) {
  res.send('Hello World')
});

// api
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

// app
app.use(express.static(path.join(__dirname, "../", "dist")));

// static content
app.use(express.static(__dirname + "/public"));

app.listen(3000, function () {
  console.log("Server listening on port 3000!");
});
