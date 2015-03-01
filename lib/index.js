// es6 runtime requirements
require('babel/polyfill');
import applescript from 'applescript';

export default class Screenrec{
  
  rec() {
   
    let script = [
      'set f to "" & (path to desktop) & "quicktimeFile"',
      'tell application "QuickTime Player"',
  	  ' set newScreenRecording to new screen recording',
	    '   tell newScreenRecording',
		  '     start',
		  '     delay 2',
		  '     pause',
	    '   end tell',
	    ' tell last item of documents',
		  '   close',
	    ' end tell',
      'end tell'
    ].join('\n');

    applescript.execString(script, function(err, rtn) {
      if (err) {
        console.log(err);
      }else{
        console.log(rtn);
      }
    });
  }
}
