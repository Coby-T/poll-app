/**
 * Main routing file
 */
 

'use strict';

var path = require('path');
var clientPath = path.resolve('wwwroot', '../client');
var serverPath = process.cwd() + '/server';

module.exports = function (app, passport) {
    
    // Client Routing
    app.route('/')
        .get(function (req, res) {
            res.sendFile(clientPath + '/home/index.html');
        });

    app.route('/poll/:id')
        .get(function (req, res) {
            res.sendFile(clientPath + '/app/show-poll.html');
        });
        
    app.route('/profile')
        .get(function(req, res) {
            res.sendFile(clientPath + '/profile/profile.html');
        });
        
    app.route('/create')
        .get(function (req, res) {
            res.sendFile(clientPath + '/app/create-poll.html');
        });
    
    // API Routing
    app.route('/api/profile')
        .get(function(req, res) {
            require(serverPath + '/api/profile.js') (req, res);
        });
        
    app.route('/api/polls')
        .get(function(req, res) {
            require(serverPath + '/api/poll.js') (req, res);
        });
    
    app.route('/api/poll/:id')
        .get(function(req, res) {
            require(serverPath + '/api/getpoll.js') (req, res);
        })
        .put(function(req, res) {
            require(serverPath + '/api/votepoll.js') (req, res);
        })
        .post(function(req, res) {
            require(serverPath + '/api/addchoice.js') (req, res);
        })
        .delete(function(req, res) {
            require(serverPath + '/api/deletepoll.js') (req, res);
        });
    
    app.route('/api/create')
        .post(function(req, res) {
            require(serverPath + '/api/createpoll.js') (req, res);
        });
        
    app.route('/logout')
        .get(function(req, res) {
            req.logout();
            res.redirect('/');
        });
        
    app.route('/auth/github')
        .get(passport.authenticate('github'));
    app.route('/auth/github/callback')
        .get(passport.authenticate('github', {
            successRedirect: '/',
            failureRedirect: '/'
        }));
    
};