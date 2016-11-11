'use strict';

var mongoose = require('mongoose');

var db = process.env.MONGO_URI || 'mongodb://localhost/blogdb';
console.log(process.env.MONGO_URI);
console.log(process.env.PORT);

mongoose.connect(db, function(err) {
    if (err) {
        console.log("couldn't connect to mongodb!");
        console.log(err);
    } else {
        console.log("connected to mongodb successfully!");
    }
});
