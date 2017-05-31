var express = require('express');
var router = express.Router();

// THIS IS ALSO TEMP!!
var Users = [];

// Show User signup View
router.get('/signup', function(req, res) {
    res.render('user/signupUser');
});

// User Signup method
router.post('/signup', function(req, res) {
    if( !req.body.id || !req.body.password ) {
        res.status("400");
        res.send("Invalid details");
    } else {
        Users.filter(function(user) {
            if( user.id == req.body.id ) {
                res.render('user/signupUser', {message: "User already exists! Login or choose another user id"});
            }
        });
        var newUser = {id: req.body.id, password: req.body.password};
        Users.push(newUser);
        req.session.user = newUser;
        res.redirect('panel');
    }
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

// Show User Panel
router.get('/panel', checkSignIn, function(req, res) {
    res.render('user/userPanel', {id: req.session.user.id});  // render view passing user id stored in session
});

// Show User Login View
router.get('/login', function (req, res) {
    res.render('user/loginUser');
});


// User Login method
router.post('/login', function (req, res) {
    console.log(Users);
    if( !req.body.id || !req.body.password ) {
        res.render('user/loginUser', {message: "Please enter both id and password"});
    } else {
        Users.filter(function(user) {
            if( user.id == req.body.id && user.password == req.body.password ) {
                req.session.user = user;
                res.redirect('panel');
            }
        });
        res.render('user/loginUser', {message: "Invalid Credentials"});
    }
});


// User Logout route
router.get('/logout', function(req, res) {
    req.session.destroy(function() {  // destroy session linked to that admin
        console.log("User logged out");
    });
    res.redirect('login');  // nav back to User login page
});

// Middleware for handling unauthorised user access attempts
router.use('/panel', function(err, req, res, next) {
    console.log(err);
    res.redirect('login');  //user should be authenticated, nav him back to login
});


/* GET users listing. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
POST to adduser.
*/
//Sending the added user to the db
router.post('/adduser', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    //insert function executes the insertion
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
DELETE to deleteuser.
*/
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;
