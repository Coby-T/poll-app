/**
 * User Schema
 */
 

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    github: {
        id: String,
        displayName: String,
        username: String
    },
    polls: {
        created: [{
            title: String,
            id: String,
        }],
        voted: [{
            id: String,
            title: String,
            option: {
                number: Number,
                text: String
            }
        }]
    }
});

module.exports = mongoose.model('User', User);