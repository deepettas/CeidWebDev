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
var flash = require('connect-flash');  //for flash messages
var mongodb = require('mongodb');
var index = require('./routes/index');
var admin = require('./routes/admin');
var Ls_emp = require('./routes/Ls_emp');
var Th_emp = require('./routes/Th_emp');


//Db Configuration & init
var db = require('./db/config');

//App instantiation
var app = express();

// view engine setup (PUG/Jade)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// STARTUP MIDDLEWARE
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());  // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }));  // for parsing application/x-www-form-urlencoded
app.use(cookieParser());  // for parsing cookies attached to the client request object
app.use(upload.array());  // for parsing multipart/form-data
app.use(express.static(path.join(__dirname, 'public')));  //enable static file serving
app.use(flash());  // enable flash messaging
app.use(session({secret: "Your secret key"}));



// ROUTER LINKING
app.use('/', index);
app.use('/admin', admin);
app.use('/LS', Ls_emp);
app.use('/TH', Th_emp);




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
