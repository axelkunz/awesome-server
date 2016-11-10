'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    storyID: Schema.Types.ObjectId,
    title: String,
    text: String,
    published: { type: Boolean, default: false },
    likes: Array,
    comments: Array
},{
    timestamps: true  // creates updatedAt and createdAt
});

module.exports = mongoose.model('Post', postSchema);
