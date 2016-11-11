"use strict";

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var compression = require('compression');
var cors = require('cors');
var routes = require('./routes.js');

// middleware
app.use(cors());
app.use(compression());  // compress static content using gzip
app.use(logger('dev'));  // morgan
app.use(session({
    secret: "everything is awesome!",
    resave: true,
    saveUninitialized: true
}));

app.use(express.static(__dirname + '/../dist'));  // development

console.log(__dirname + './dist');
console.log(__dirname + './../dist');

app.use(bodyParser.json());

// connect to db
require('./database');

// security
app.disable('x-powered-by');

app.use('/api', routes);

app.listen(port, function () {
    console.log('Server listening on port ' + port + "!");
});
