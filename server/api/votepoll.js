/**
 * Poll voting with PUT
 */
 
 
'use strict';

var Poll = require('../models/poll.model');
var User = require('../models/user.model');

module.exports = function (req, res) {
    
    var voteOption = req.body.voteNum;
    var voteQuestion, 
        voteId,
        voteChoiceText;
    
    Poll.findById(req.params.id, function(err, poll) {
        if (err) {
            throw err;
        }

        voteQuestion = poll.poll.title;
        voteId = poll._id;
        voteChoiceText = poll.poll.options.text;
        
        
        
        // If authenticated, add the user to the voted user list
        if (req.session.passport) {
            if (poll.poll.voted.users.indexOf(req.session.passport.user) === -1) {
                // Add a vote to the selected
                poll.poll.options[voteOption].votes ++;
                poll.poll.voted.users.push(req.session.passport.user);
                // Add vote info to user profile
/*                User.findById(req.session.passport.user, function(err, user) {
                    if (err) {
                        throw err;
                    }
                    
                    user.polls.voted.id = voteId || "";
                    user.polls.voted.question = voteQuestion || "";
                    user.polls.voted.option.push({
                        number: voteOption,
                        text: voteChoiceText
                    });
                    
                    user.save(function (err) {
                        if (err) {
                            throw err;
                        }
                    });
                });*/
            }
        }
        else {
            // Add the IP address to the voted list no matter 
            //      what to prevent vote manipulation
            var ip = req.headers['x-forwarded-for'] || 
                req.connection.remoteAddress || 
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress;
            if (poll.poll.voted.ip.indexOf(ip) === -1) {
                // Add a vote to the selected
                poll.poll.options[voteOption].votes ++;
                poll.poll.voted.ip.push(ip);
            }
        }

        // Save the update
        poll.save(function (err) {
            if (err) {
                throw err;
            }
            res.json(poll);
        });
        
        
    });
    

};