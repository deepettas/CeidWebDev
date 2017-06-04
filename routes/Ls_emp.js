/**
 * Created by fortysixntwo on 04/06/2017.
 */

var express = require('express');
var router = express.Router();

// Show User Panel
router.get('/panel', checkSignIn, function(req, res) {
    res.render('Ls_emp/Ls_emp_panel', {id: req.session.user.id});  // render view passing user id stored in session
});



function checkSignIn(req, res, next) {
    if( req.session.user ) {  // if session exists, proceed to next page
        next();
    } else {
        var err = new Error("Not logged in!");
        console.log(req.session.user);
        next(err);  // error trying to access unauthorized page!!! INTRUDER ALERT
    }
}

// Show User Login View
router.get('/login', function (req, res) {
    res.render('Ls_emp/Ls_emp_login');
});

// User Login method
router.post('/login', function (req, res) {
    if( !req.body.id || !req.body.password ) {
        res.render('Ls_emp/Ls_emp_login', {message: "Please enter both id and password"});
    } else {
        Users.filter(function(user) {
            if( user.id == req.body.id && user.password == req.body.password ) {
                req.session.user = user;
                res.redirect('panel');
            }
        });
        res.render('Ls_emp/Ls_emp_login', {message: "Invalid Credentials"});
    }
});

// Middleware for handling unauthorised user access attempts
router.use('/panel', function(err, req, res, next) {
    console.log(err);
    res.redirect('login');  //user should be authenticated, nav him back to login
});

module.exports = router;