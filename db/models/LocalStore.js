/**
 * Created by nomaterials on 01/06/2017.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var LocalStoreSchema = Schema({

    transit_hub_id: {type: Schema.ObjectId, ref: 'TransitHub', required: true},
    phone_number: {type: Number, required: true},

    Address: [{
        City: {type: String, required: true},
        Street: {type: String, required: true},
        Number: {type: String, required: true},
        Post_code: {type: Number, required: true}
    }],


    Location: [{
        Longitude: {type: String},
        Latitude: {type: String}
    }],

    // All stored packages in the current Store
    Stored_packages: [{
        package_id: { type: Schema.ObjectId, ref:'Package', unique: true}

    }]

});


module.exports = mongoose.model("LocalStore",LocalStoreSchema);