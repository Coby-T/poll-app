/**
 * Shows created polls, votes, and user info with GET
 */
 

'use strict';

var User = require('../models/user.model');

module.exports = function (req, res) {
    
    if (req.session.passport) {
        
        var user = req.session.passport.user;
        
        User.findById(user, function (err, profile) {
            if (err) {
                throw err;
            }
            profile.error = null;
            res.json(profile);
        });
    }
    else {
        res.json({error: 401});
    }

};