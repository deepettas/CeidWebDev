/**
 * Created by nomaterials on 01/06/2017.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var TransitHubEmpSchema = Schema({
    username: String,
    password: String
});


module.exports = mongoose.model("TransitHubEmp",TransitHubEmpSchema);