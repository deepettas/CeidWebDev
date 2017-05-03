/**
 * Created by nomaterials on 03/05/2017.
 */

var db = require('./db/config');


const adminCP = db.create('AdminControlPanel');

const employee = db.create('Employee');



var models = { a: adminCP,
                b: employee };




module.exports = models;