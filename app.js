//Import modules
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser'); // Gia ta cookies
var session = require('express-session');  //for session handling
var bodyParser = require('body-parser'); //pairnei to body apo html request
var multer = require('multer');
var upload = multer();
var mongodb = require('mongodb');
var index = require('./routes/index');
var users = require('./routes/users');

//Db Configuration & init
var db = require('./db/config');

//App instantiation
var app = express();

// view engine setup (PUG/Jade)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// STARTUP MIDDLEWARE
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());  // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }));  // for parsing application/x-www-form-urlencoded
app.use(cookieParser());  // for parsing cookies attached to the client request object
app.use(upload.array());  // for parsing multipart/form-data
app.use(express.static(path.join(__dirname, 'public')));  //enable static file serving
app.use(session({secret: "Your secret key"}));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});


var Admins = [];

//Show admin signup view
app.get('/signupAdmin', function(req, res) {
    res.render('signupAdmin');
});

app.post('/signupAdmin', function(req, res) {
    if( !req.body.id || !req.body.password ) {
        res.status("400");
        res.send("Invalid details");
    } else {
        Admins.filter(function(admin) {
            if( admin.id == req.body.id ) {
                res.render('signup', {message: "Admin already exists! Login or choose another admin id"});
            }
        });
        var newAdmin = {id: req.body.id, password: req.body.password};
        Admins.push(newAdmin);
        req.session.admin = newAdmin;
        res.redirect('/adminPanel');
    }
});


// ROUTER LINKING
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// ERROR HANDLERS
// development error handler - will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler - no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
