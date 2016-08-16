/**
 * Server-side controller for pulling specific polls with GET
 */
 

'use strict';

var Poll = require('../models/poll.model');

module.exports = function (req, res) {
    
    var searchId = req.params.id;
    
    Poll.findById(searchId, function(err, poll) {
        if (err) {
            throw err;
        }
        if (req.session.passport) {
            poll.isCreator = (req.session.passport.user === poll.creatorId);
        }
        else {
            poll.isCreator = true;
        }
        res.json(poll);
    });
    
};