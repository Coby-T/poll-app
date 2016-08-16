/**
 * Main application file
 */


'use strict';

var express = require('express');
var path = require('path');
var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var routes = require('./routes.js');

var app = express();
require('./config/passport') (passport);

// Connect to mongoDB
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on('error', function (err) {
    console.log("MongoDB has run into an error: " + err);
});

// Set up directory paths
app.use('/resources', express.static(path.resolve(__dirname, '../client/resources')));

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET || 'temp',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Set up middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Routing file
routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log("Not the NSA, but we're still listening on port " + port);
});