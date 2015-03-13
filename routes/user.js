var express = require('express');
var router = express.Router();

//Users
router.get('/users', function(req, res){
  res.render('users/index', {
    title: 'Users',
    content: 'some user content goes here...',
    subheading: 'user sidebar'
  });
});

module.exports = router;