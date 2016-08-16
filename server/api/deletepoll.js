/**
 * Delete polls with DELETE
 */
 
 
'use strict';

var Poll = require('../models/poll.model');
var User = require('../models/user.model');

module.exports = function (req, res) {
    
    var id = req.params.id;
    
    Poll.findById(id, function(err, poll) {
        if (err) {
            throw err;
        }
        
        User.findById(req.session.passport.user, function (err, user) {
            for (var i = 0; i < user.polls.created.length; i++) {
                if (user.polls.created[i].id === id) {
                    user.polls.created.splice(i, 1);
                }
            }
            
            user.save(function (err) {
                if (err) {
                    throw err;
                }
            });
        });
        
        poll.remove(function(err) {
            if (err) {
                throw err;
            }
            
            res.json("deleted");
        });
        
    });
    
};