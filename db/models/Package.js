/**
 * Created by nomaterials on 01/06/2017.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var PackageSchema = Schema({

});


//Export model
module.exports = mongoose.model('Package', PackageSchema);