/**
 * Created by nomaterials on 01/06/2017.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var AdminSchema = Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
});


//Export model
module.exports = mongoose.model('Admin', AdminSchema);