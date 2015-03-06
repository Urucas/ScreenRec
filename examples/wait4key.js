/*
 * record screen until [ctrl + c] is pressed 
 */
var ScreenRec = require('../node/');
var app = new ScreenRec({wait4key:true});
    app.rec();


