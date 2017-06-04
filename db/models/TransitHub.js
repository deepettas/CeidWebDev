/**
 * Created by nomaterials on 01/06/2017.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;


// Used for password hashing
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;


var TransitHubSchema = Schema({
    longtitude: {type: String, required: true},
    latitude: {type: String, required: true},
    name: {type: String, required: true},
    //local_store_id: {type: Schema.ObjectId, required: true, unique: true}

});

// Password hashing BEFORE save to DB
TransitHubSchema.pre('save', function(next) {
    var transit = this;

    // only hash the password if it has been modified (or is new)
    if (!transit.isModified('password'))
        return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err)
            return next(err);

        // hash the password using our new salt
        bcrypt.hash(transit.password, salt, function (err, hash) {
            if (err)
                return next(err);

            // override the cleartext password with the hashed one
            transit.password = hash;
            next();

        });
    });
});

TransitHubSchema.methods.comparePassword =  function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
       if (err)
           return cb(err);
       cb(null, isMatch);
    });

};

module.exports = mongoose.model("TransitHubEmp", TransitHubSchema);