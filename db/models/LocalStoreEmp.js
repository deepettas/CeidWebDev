/**
 * Created by nomaterials on 01/06/2017.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var LocalStoreEmpSchema = Schema({
    username: String,
    password: String
});


module.exports = mongoose.model("LocalStoreEmp",LocalStoreEmpSchema);