/**
 * Created by nomaterials on 01/06/2017.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Used for password hashing
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;


var AdminSchema = Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});


// Password hashing BEFORE save to DB
AdminSchema.pre('save', function(next) {
    var admin = this;

    // only hash the password if it has been modified (or is new)
    if (!admin.isModified('password'))
        return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err)
            return next(err);

        // hash the password using our new salt
        bcrypt.hash(admin.password, salt, function(err, hash) {
            if (err)
                return next(err);

            // override the cleartext password with the hashed one
            admin.password = hash;
            next();
        });
    });
});

//Method used during authentication
AdminSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err)
            return cb(err);
        cb(null, isMatch);
    });
};

//Export model
module.exports = mongoose.model('Admin', AdminSchema);