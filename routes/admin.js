/**
 * Created by nomaterials on 31/05/2017.
 */

var express = require('express');
var router = express.Router();

var Admin = require('./db/models/Admin');


// THIS IS TEMP!!! SHOULD BE STORED IN DB!!!!
var Admins = [];


// Show admin signup view
router.get('/signup', function(req, res) {
    res.render('admin/signupAdmin');
});

// Admin Signup method
router.post('/signup', function(req, res) {
    if( !req.body.id || !req.body.password ) {
        res.status("400");
        res.send("Invalid details");
    } else {
        Admins.filter(function(admin) {
            if( admin.id == req.body.id ) {
                res.render('/admin/signupAdmin', {message: "Admin already exists! Login or choose another admin id"});
            }
        });
        var newAdmin = {id: req.body.id, password: req.body.password};
        Admins.push(newAdmin);
        req.session.admin = newAdmin;
        res.redirect('panel');
    }
});

function checkSignIn(req, res, next) {
    if( req.session.admin ) {  // if session exists, proceed to next page
        next();
    } else {
        var err = new Error("Not logged in!");
        console.log(req.session.admin);
        next(err);  // error trying to access unauthorized page!!! INTRUDER ALERT
    }
}

// Show Admin Panel
router.get('/panel', checkSignIn, function(req, res) {
    res.render('admin/adminPanel', {id: req.session.admin.id});  // render view passing user id stored in session
});


// Show Admin Login View
router.get('/login', function (req, res) {
    res.render('admin/loginAdmin');
});

// Admin Login method
router.post('/login', function (req, res) {
    console.log(Admins);
    if( !req.body.id || !req.body.password ) {
        res.render('admin/loginAdmin', {message: "Please enter both id and password"});
    } else {
        Admins.filter(function(admin) {
            if( admin.id == req.body.id && admin.password == req.body.password ) {
                req.session.admin = admin;
                res.redirect('panel');
            }
        });
        res.render('admin/loginAdmin', {message: "Invalid Credentials"});
    }
});

// Admin Logout route
router.get('/logout', function(req, res) {
    req.session.destroy(function() {  // destroy session linked to that admin
        console.log("Admin logged out");
    });
    res.redirect('login');  // nav back to Admin login page
});

// Middleware for handling unauthorised admin access attempts
router.use('/panel', function(err, req, res, next) {
    console.log(err);
    res.redirect('login');  //admin should be authenticated, nav him back to login
});



//export this router to use in our app.js
module.exports = router;