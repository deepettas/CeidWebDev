/**
 * Created by nomaterials on 03/05/2017.
 */
//mongo ds163667.mlab.com:63667/web-project-2017 -u admin -p webprojectadmin
//Cloud Database Connection
var uri = 'admin:webprojectadmin@ds163667.mlab.com:63667/web-project-2017';


var DB = require('monk')(uri);

module.exports = DB;