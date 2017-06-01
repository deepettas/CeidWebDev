/**
 * Created by nomaterials on 01/06/2017.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var LocalStoreSchema = Schema({

});


module.exports = mongoose.model("LocalStore",LocalStoreSchema);