/* 
 * record 10 seconds video
 */
var ScreenRec = require('../node/');  
var app = new ScreenRec({time:10});
    app.rec();


