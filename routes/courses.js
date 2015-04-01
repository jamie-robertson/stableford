var express = require('express');
var router = express.Router();

var mongoose = require('../models/index');
var Course = mongoose.model('Course');

/*
*  Get Courses list
* */
router.get('/courselist', function(req, res) {
  Course.find(function (err, courses) {
    if (err) return console.error(err);
    res.json(courses);
  });
});


module.exports = router;