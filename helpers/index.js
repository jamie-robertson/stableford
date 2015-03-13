var bcrypt = require('bcryptjs');
var http = require('http');
var mongo = require('mongojs');

var config = require('./config.js');

exports.localRegistration = function(username, password) {
  var hash = bcrypt.hashSync(password, 8);
  var user = {
    "username": username,
    "password": password
  }
}

mongo.get