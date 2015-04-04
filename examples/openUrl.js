/* 
 * Open an url & start recording
 */

var ScreenRec = require('../node/');  
var app = new ScreenRec({time:20, url:"https://github.com/Urucas/chrome-inspect-devices-quick-access", togif:true, silent:false});
    app.rec();
