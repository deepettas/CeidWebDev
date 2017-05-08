/**
 * Created by nomaterials on 03/05/2017.
 */

var mongoose = require('mongoose');



// Schema [ Model ] ~= Layout for a model

// Schema/Model Initialization
var adminSchema = mongoose.Schema({
    username: String,
    password: String
});
var Admin = mongoose.model("Admin", adminSchema);
//----------------------------------------------------------------

// Employee
var EmployeeSchema = mongoose.Schema({
    username: String,
    password: String
});
var Employee = mongoose.model("Employee",EmployeeSchema)

//----------------------------------------------------------------


// Local Store
var LocalStoreSchema = mongoose.Schema({

});
var LocalStore = mongoose.model("LocalStore",LocalStoreSchema)

//----------------------------------------------------------------


//Transit Hub
var TransitHubSchema = mongoose.Schema({

});
var TransitHub = mongoose.model("TransitHub",TransitHubSchema)

//----------------------------------------------------------------

//Sender
var SenderSchema = mongoose.Schema({

});
var Sender = mongoose.model("Sender",SenderSchema)

//----------------------------------------------------------------

//Recipient
var RecipientSchema = mongoose.Schema({

});
var Recipient = mongoose.model("Recipient",RecipientSchema)
//----------------------------------------------------------------

//Website
var WebsiteSchema = mongoose.Schema({

});
var Website = mongoose.model("Website",WebsiteSchema)
//----------------------------------------------------------------
//AdminControlPanel
var AdminControlPanelSchema = mongoose.Schema({

});
var AdminControlPanel = mongoose.model("AdminControlPanel",AdminControlPanelSchema)
//----------------------------------------------------------------

// Create instance of admin # Testing
var admin1 = new Admin({ username: 'JoBell2312',
                         password: 'hashmehashme'});
// Save to MongoDB
admin1.save();

var models = mongoose.modelNames();
var mmodels = mongoose.models;

for (model in models){
    dropCollection(model)
}
console.log(mongoose.modelNames());


module.exports = {adminCP: Admin,
                  employee: Employee};


function dropCollection (modelName) {
    if (!modelName || !modelName.length) {
        Promise.reject(new Error('You must provide the name of a model.'));
    }

    try {
        var model = mongoose.model(modelName);
        var collection = mongoose.connection.collections[model.collection.collectionName];
    } catch (err) {
        return Promise.reject(err);
    }

    return new Promise(function (resolve, reject) {
        collection.drop(function (err) {
            if (err) {
                reject(err);
                return;
            }

            // Remove mongoose's internal records of this
            // temp. model and the schema associated with it
            delete mongoose.models[modelName];
            delete mongoose.modelSchemas[modelName];

            resolve();
        });
    });
}