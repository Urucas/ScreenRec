/*
 * record 10 seconds video & export to gif
 */
var ScreenRec = require('../node/');  
var app = new ScreenRec({time:10, togif: true});
    app.rec();
