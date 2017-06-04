/**
 * Created by nomaterials on 01/06/2017.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;




var TransitHubSchema = Schema({
    //longtitude: {type: String, required: true},
    //latitude: {type: String, required: true},
    location: {type: Array, required: true},
    name: {type: String, required: true},
    //local_store_id: {type: Schema.ObjectId, required: true, unique: true}

});

module.exports = mongoose.model("TransitHub", TransitHubSchema);