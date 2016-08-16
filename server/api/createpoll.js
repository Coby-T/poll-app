/**
 * Poll creation with POST
 */
 

'use strict';

var Poll = require('../models/poll.model');
var User = require('../models/user.model');

module.exports = function (req, res) {

    var body = req.body;
    var title = body.title;
    var optionsList = body.options;
    var creator = req.session.passport.user;
    var date = new Date();
    var options = [];
    
    for (var i = 0; i < optionsList.length; i++) {
        options.push({
            number: i,
            text: optionsList[i].text,
            votes: 0
        });
    }
    
    var newPoll = Poll({
        date: date,
        creatorId: creator,
        poll: {
            title: title,
            options: options,
            voted: {
                ip: [],
                users: []
            }
        }
    });
    
    newPoll.save(function (err, poll) {
        if (err) {
            throw err;
        }
        
        // Pass the title and _id to the user's created polls
        User.findById(req.session.passport.user, function (err, user) {
            if (err) {
                throw err;
            }
            
            var createdPoll = {
                title: title,
                id: poll._id
            };
            user.polls.created.push(createdPoll);
            user.save(function (err) {
                if (err) {
                    throw err;
                }
            });
        });
        
        res.json({
            redirect: '/poll/' + poll._id
        });
    });
        
};