/**
 * Created by nomaterials on 01/06/2017.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var PackageSchema = Schema({
    Sender_id: {type: Schema.ObjectId, ref: 'Sender', required:true},
    Recipient_id: {type: Schema.ObjectId, ref: 'Recipient', required:true},
    Transit_hub_id: {type: Schema.ObjectId, ref: 'TransitHub', required:true}
});


//Export model
module.exports = mongoose.model('Package', PackageSchema);