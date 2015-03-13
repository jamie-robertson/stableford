var express = require('express');
var router = express.Router();

//Users
router.get('/scoreboard', function(req, res){
  res.render('scoreboard/index', {
    title: 'Scoreboard',
    content: 'some scoreboard content goes here...',
    subheading: 'scoreboard sidebar'
  });
});

module.exports = router;