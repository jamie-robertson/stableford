var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Stableford' });
});

router.get('/players', function(req, res, next) {
    res.render('players', { title: 'Stableford' });
});

router.get('/scorecard', function(req, res, next) {
    res.render('scores', { title: 'Scores' });
});

router.get('/courses', function(req, res, next) {
  res.render('courses', { title: 'Courses' });
});


module.exports = router;
