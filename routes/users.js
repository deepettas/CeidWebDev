var express = require('express');
var router = express.Router();

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

module.exports = router;
