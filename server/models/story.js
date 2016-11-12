'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storySchema = new Schema({
    title: String
},{
    timestamps: true  // creates updatedAt and createdAt
});

module.exports = mongoose.model('Story', storySchema);
