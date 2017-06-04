/**
 * Created by nomaterials on 01/06/2017.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Used for password hashing
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;


var SenderSchema = Schema({
    
});


//Export model
module.exports = mongoose.model('Sender', SenderSchema);