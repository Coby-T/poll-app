/**
 * Add a poll option with POST
 */
 
 
'use strict';

var Poll = require('../models/poll.model');

module.exports = function (req, res) {
    
    var choice = req.body.choice;
    
    Poll.findById(req.params.id, function(err, poll) {
        if (err) {
            throw err;
        }
        
        poll.poll.options.push({
            number: poll.poll.options.length,
            text: choice,
            votes: 0
        });
        
        poll.save(function (err) {
            if (err) {
                throw err;
            }
            res.redirect('/poll/' + poll._id);
        });

    });

};