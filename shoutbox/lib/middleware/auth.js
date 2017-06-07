var express = require('express');
var User = require('../user');

module.exports = express.basicAuth(User.authenticate);