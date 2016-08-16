/**
 * Poll Schema
 */


'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
    date: Date,
    creatorId: String,
    poll: {
        title: String,
        options: [{
            number: Number,
            text: String,
            votes: Number
        }],
        voted: {
            ip: [String],
            users: [String]
        }
    }
});

module.exports = mongoose.model('Poll', Poll);