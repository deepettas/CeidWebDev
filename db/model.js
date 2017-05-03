/**
 * Created by nomaterials on 03/05/2017.
 */

var db = require('./config');


const adminCP = db.create('AdminControlPanel');
adminCP.insert([{username: 'JaarVanDoe', password: 'pass123'},
                {username: 'MonikaBell', password: 'gr8882312'}]);





const employee = db.create('Employee');





