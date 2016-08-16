/**
 * Homepage server-side controller with GET
 */
 

'use strict';

var Poll = require('../models/poll.model');

module.exports = function (req, res) {
    
/*    Poll.create({
        date: new Date(),
        creatorId: "0000",
        poll: {
            title: "Test Poll",
            options: [{
                number: 0,
                text: "test",
                votes: 0
            }],
            voted: {
                ip: [],
                users: []
            }
        }
    });*/
    
    Poll.find({}, 'poll')
        .sort('-date')
        .exec(function(err, docs) {
            if (err) {
                throw err;
            }
            
            res.json(docs.splice(0, 20));
        });
    
};