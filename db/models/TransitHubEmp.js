/**
 * Created by nomaterials on 01/06/2017.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Used for password hashing
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;


var TransitHubEmpSchema = Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    //transit_hub_id: {type: Schema.ObjectId,ref: 'TransitHub', required: true}
});


// Password hashing BEFORE save to DB
TransitHubEmpSchema.pre('save', function(next) {
    var transitemp = this;

    // only hash the password if it has been modified (or is new)
    if (!transitemp.isModified('password'))
        return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err)
            return next(err);

        // hash the password using our new salt
        bcrypt.hash(transitemp.password, salt, function (err, hash) {
            if (err)
                return next(err);

            // override the cleartext password with the hashed one
            transitemp.password = hash;
            next();

        });
    });
});

TransitHubEmpSchema.methods.comparePassword =  function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err)
            return cb(err);
        cb(null, isMatch);
    });

};



module.exports = mongoose.model("TransitHubEmp",TransitHubEmpSchema);