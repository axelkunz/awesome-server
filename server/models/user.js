'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: { type : String , unique : true, required : true },
    password: { type : String , required : true },
    role: { type: String, default: "friend" },  // friend, family, admin
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 }
},{
    timestamps: true  // creates updated_at and created_at
});

module.exports = mongoose.model('User', userSchema);
