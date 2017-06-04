/**
 * Created by nomaterials on 01/06/2017.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var PackageSchema = Schema({
    sender_id: {type: Schema.ObjectId, ref: 'Sender', required: true},
    recipient_id: {type: Schema.ObjectId, ref: 'Recipient', required: true},
    transit_hub_id: {type: Schema.ObjectId, ref: 'TransitHub', required: true},
    exrpess: {type: Boolean, required: true},
    qr_code: {type: kati, required: true},
    delivery_address: {type: String, required: true},

    current_location: [{
        Longitude: {type: String},
        Latitude: {type: String}
    }],

    locations_passed :  [
        {
            Date: {type: Date},
            Location: [{
                Longitude: {type: String},
                Latitude: {type: String}
            }]
        }],

    cost: {type: Number, required: true}


});


//Export model
module.exports = mongoose.model('Package', PackageSchema);