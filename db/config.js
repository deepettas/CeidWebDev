/**
 * Created by nomaterials on 03/05/2017.
 */

//Cloud Database Connection
var uri = 'admin:webprojectadmin@ds163667.mlab.com:63667/web-project-2017';


var DB = require('monk')(uri);

module.exports = DB;