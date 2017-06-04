/**
 * Created by nomaterials on 01/06/2017.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var RecipientSchema = Schema({
    tracking_number: {type: String, required: true, unique: true},
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    package_id: { type: Schema.ObjectId, ref:'Package', unique: true}
});


//Export model
module.exports = mongoose.model('Recipient', RecipientSchema);