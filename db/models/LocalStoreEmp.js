/**
 * Created by nomaterials on 01/06/2017.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var LocalStoreEmpSchema = Schema({



    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});


// Password hashing BEFORE save to DB
LocalStoreEmpSchema.pre('save', function(next) {
    var emp = this;

    // only hash the password if it has been modified (or is new)
    if (!emp.isModified('password'))
        return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err)
            return next(err);

        // hash the password using our new salt
        bcrypt.hash(emp.password, salt, function(err, hash) {
            if (err)
                return next(err);

            // override the cleartext password with the hashed one
            emp.password = hash;
            next();
        });
    });
});

//Method used during authentication
LocalStoreEmpSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err)
            return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model("LocalStoreEmp",LocalStoreEmpSchema);