/* 
 * Open an url & start recording
 */

var ScreenRec = require('../node/');  
var app = new ScreenRec({wait4key:true, url:"http://www.netflix.com", togif:true, silent:false});
    app.rec();
