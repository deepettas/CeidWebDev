/**
 * Created by nomaterials on 03/05/2017.
 */

var mongoose = require('mongoose');



// Schema/Model Initialization

var adminSchema = mongoose.Schema({
    username: String,
    password: String
});
var Admin = mongoose.model("Admin", adminSchema);

// Create instance of admin
var admin1 = new Admin({ username: 'JoBell2312',
                         password: 'hashmehashme'});
// Save to MongoDB
admin1.save();



var employeeSchema = mongoose.Schema({
    username: String,
    password: String
});
var Employee = mongoose.model("Employee", employeeSchema);





module.exports = {adminCP: Admin,
                  employee: Employee};


