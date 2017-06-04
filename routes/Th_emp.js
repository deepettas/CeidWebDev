/**
 * Created by fortysixntwo on 04/06/2017.
 */

var express = require('express');
var router = express.Router();

//Get the transit hub model
var THemp = require('../db/models/TransitHubEmp');


// Show User Panel
router.get('/panel', checkSignIn, function(req, res) {
    res.render('Th_emp/Th_emp_panel', {id: req.session.THemp.username});  // render view passing user id stored in session
});



function checkSignIn(req, res, next) {
    if( req.session.THemp ) {  // if session exists, proceed to next page
        next();
    } else {
        var err = new Error("Not logged in!");
        console.log(req.session.THemp);
        next(err);  // error trying to access unauthorized page!!! INTRUDER ALERT
    }
}

// Show User Login View
router.get('/login', function (req, res) {
    res.render('Th_emp/Th_emp_login');
});


// Admin Login method
router.post('/login', function (req, res) {

    if( !req.body.id || !req.body.password ) {
        res.render('Th_emp/Th_emp_login', {message: "Please enter both id and password"});
    } else {

        // Search DB for that username
        THemp.findOne({ username: req.body.id }, function(err, data) {
            if (err)
                throw err;
            if(!data) {
                req.flash('info', 'Invalid credentials!');
                res.redirect('login');
            } else {
                // test a matching password
                data.comparePassword(req.body.password, function (err, isMatch) {
                    if (err)
                        throw err;
                    if (isMatch) {
                        req.session.THemp = data;
                        res.redirect('panel');
                    } else {
                        req.flash('info', 'Invalid credentials!');
                        res.redirect('login');
                    }
                });
            }
        });
    }
});


// Middleware for handling unauthorised user access attempts
router.use('/panel', function(err, req, res, next) {
    console.log(err);
    res.redirect('login');  //user should be authenticated, nav him back to login
});

//TH emp logout route
router.get('/logout', function(req, res) {
    req.session.destroy(function() {  // destroy session linked to that admin
        console.log("THemp logged out");
    });
    res.redirect('login');  // nav back to Admin login page
});


module.exports = router;
