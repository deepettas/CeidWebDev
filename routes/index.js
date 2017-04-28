var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
})

router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Jerry draws dicks in Evernote' });
});

module.exports = router;
