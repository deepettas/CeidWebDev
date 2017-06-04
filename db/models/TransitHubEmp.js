/**
 * Created by nomaterials on 01/06/2017.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Used for password hashing
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;


var TransitHubEmpSchema = Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    th_id: {type: Schema.ObjectId, required: true}
});


module.exports = mongoose.model("TransitHubEmp",TransitHubEmpSchema);