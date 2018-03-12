var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session   = require('express-session');
var expressValidator = require('express-validator');
var passport  = require('passport');
var localStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var multer = require('multer');
var flash = require('connect-flash');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;


var app = express();
var index = require('./routes/index');
var users = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//Handle file uploads
var multer = require('multer');
var upload = multer({ dest: './uploads' });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

//Handle express sessions
app.use(require("express-session")({
    secret : "I am the best developer in the entire world",
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());


//passport.use(new localStrategy(User.authenticate()));
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

//Express validator
app.use(expressValidator({
    customValidators: {
        containsTwoTags: function (input) {
            var tags = input.split(',');
            // Remove empty tags
            tags = tags
                .filter(function(tag) { return /\S/.test(tag) });
            // Remove duplicate tags
            tags = tags
                .filter(function(item, pos, self) {
                    return self.indexOf(item) == pos;
                });
            return tags.length <= 2;
        }
    }
}));
app.use('/', index);
app.use('/users', users);




  app.listen(3000 , function () {
     console.log("SERVER IS RUNNING ON PORT 3000")
  });

module.exports = app;
