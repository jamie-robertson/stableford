var express = require('express');
var router = express.Router();
var passport = require('passport');

//define routes
router.use(require('./user'));
router.use(require('./scoreboard'));

//Home
router.get('/', function(req, res){
  res.render('home', {user: req.user });
});

//Sign in
router.get('/signin', function(req, res){
  res.render('signin');
});

//sends the request through our local signup strategy, and if successful
// takes user to homepage, otherwise returns then to signin page
router.post('/local-registration', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signin'
}));

router.post('/login', passport.authenticate('local-signin', {
  successRedirect: '/',
  failureRedirect: '/signin'
}));

router.get('/logout', function(req, res) {
  var name = req.user.username;
  req.logout();
  res.redirect('/');
  req.session.notice = 'You have successfully logged out' + name + '!';
  console.log('Logged out' + req.user.username);
});


module.exports = router;