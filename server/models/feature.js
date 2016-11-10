'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var featureSchema = new Schema({
    type: { type: String, default: "Feature" },
    properties: {},
    geometry: {}
});

module.exports = mongoose.model('GeoJson', featureSchema);
