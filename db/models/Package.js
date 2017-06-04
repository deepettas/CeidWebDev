/**
 * Created by nomaterials on 01/06/2017.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var PackageSchema = Schema({
    // Schema connections
    sender_id: {type: Schema.ObjectId, ref: 'Sender', required: true},
    recipient_id: {type: Schema.ObjectId, ref: 'Recipient', required: true},
    transit_hub_id: {type: Schema.ObjectId, ref: 'TransitHub', required: true},

    exrpess: {type: Boolean, required: true},
    qr_code: {type: kati, required: true},  //TODO: Add type
    delivery_address: {type: String, required: true},
    cost: {type: Number, required: true},


    // Current location of the package
    current_location: [{
        Longitude: {type: String},
        Latitude: {type: String}
    }],

    // Array that holds all the previous of space-time
    // combinations of the package
    locations_passed :  [
        {
            Date: {type: Date},
            Location: [{
                Longitude: {type: String},
                Latitude: {type: String}
            }]
        }],


});


//Export model
module.exports = mongoose.model('Package', PackageSchema);