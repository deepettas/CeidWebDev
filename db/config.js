/**
 * Created by nomaterials on 03/05/2017.
 */

//mongo ds163667.mlab.com:63667/web-project-2017 -u admin -p webprojectadmin

//Cloud Database Connection
var mongoose = require('mongoose');

var uri = 'admin:webprojectadmin@ds163667.mlab.com:63667/web-project-2017';

// Create the database connection
mongoose.connect(uri);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + uri);
    //Drop the DB
    mongoose.connection.db.dropDatabase();
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});


//Models/Schemas
var models = require('./model');


module.exports = models;