'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    title: String,
    subtitle: String,
    text: String,
    published: { type: Boolean, default: false },
    likes: Array,
    comments: Array,
    publishedAt: Date,
    viewCount: { type: Number, default: 0 }
},{
    timestamps: true  // creates updatedAt and createdAt
});

module.exports = mongoose.model('Post', postSchema);
