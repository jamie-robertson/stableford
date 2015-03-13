//initializes the app and glues everything together
var express = require('express');
var exphbs = require('express-handlebars');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var session = require('express-session');


var config = require('./config.js');
var helpers = require('./helpers');

var app = express();

//===============EXPRESS================
//http request logger
app.use(logger('combined'));

//Parse Cookie header and populate req.cookies with an object keyed by the cookie name
app.use(cookieParser());

//Node.js body parsing middleware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
app.use(methodOverride('X-HTTP-Method-Override'));

//Simple session middleware for Express
app.use(session({secret: 'hearts', saveUninitialized: true, resave: true}));

//Passport is Express-compatible authentication middleware for Node.js.
app.use(passport.initialize());
app.use(passport.session());

// Session-persisted message middleware
app.use(function(req, res, next){
  var err = req.session.error;
  var msg = req.session.notice;
  var success = req.session.success;

  delete req.session.error;
  delete req.session.success;
  delete req.session.notice;

  if (err) res.locals.error = err;
  if (msg) res.locals.notice = msg;
  if (success) res.locals.success = success;

  next();
});

// Configure express to use handlebars templates
var hbs = exphbs.create({
defaultLayout: 'main'
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');


//===============ROUTES===============
app.use(require('./routes'));

//Get static assets
app.use(express.static(__dirname + '/public'));


//Start
var port = process.env.port || 3000;
app.listen(port);
console.log('Listening on port ' + port + '...');