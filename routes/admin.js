/**
 * Created by nomaterials on 31/05/2017.
 */

var express = require('express');
var router = express.Router();

var Admin = require('../db/models/Admin');
var THemp = require('../db/models/TransitHubEmp');



// Show admin signup view
router.get('/signup', function(req, res) {
    res.render('admin/signupAdmin', {message: req.flash('info')});
});

// Admin Signup method
router.post('/signup', function(req, res) {
    if( !req.body.id || !req.body.password ) {
        res.status("400");
        res.send("Invalid details");
    } else {
        //Create an instance of an admin model
        var newAdmin = new Admin({
            username: req.body.id,
            password: req.body.password
        });
        //Save to db - handle errors, or set session variable and redirect to adminPanel
        newAdmin.save(function(err, adminData){
            if(err) {
                console.log(err);
                req.flash('info', 'Username already taken!');  //TODO: FIX THIS TO SPECIFY ERROR!!!!
                res.redirect('signup');
            } else {
                req.session.admin = adminData;
                res.redirect('panel');
            }
        });
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
    res.render('admin/adminPanel', {id: req.session.admin.username});  // render view passing user id stored in session
});


// Show Admin Login View
router.get('/login', function (req, res) {
    res.render('admin/loginAdmin', {message: req.flash('info')});
});

// Admin Login method
router.post('/login', function (req, res) {
    console.log(Admins);
    if( !req.body.id || !req.body.password ) {
        res.render('admin/loginAdmin', {message: "Please enter both id and password"});
    } else {

        // Search DB for that username
        Admin.findOne({ username: req.body.id }, function(err, data) {
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
                        req.session.admin = data;
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


//--------PANEL ROUTES---------

//TODO: MOVE THIS ROUTE TO ACCORDING ROUTE FILE WITH TH employee filename
//Get all Transit Hub Emp from
router.get('/panel/listTHemp', function(req, res) {
    THemp.find({},{},function(e,docs){
        res.json(docs);
    });
});


//transit hub employee add
router.post('/panel/addTHemp', function(req, res) {

    //Get our form values
    var userName = req.body.username;
    var password = req.body.password;

    THemp.insert({
        "username" : userName,
        "password" : password
    }, function (err, doc) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});


router.delete('/panel/deleteTHemp/:id', function (req, res) {
    var THempToDelete = req.params.id;
    THemp.remove({ '_id' : THempToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});








//export this router to use in our app.js
module.exports = router;