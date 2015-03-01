// es6 runtime requirements
require('babel/polyfill');
import applescript from 'applescript';

export default class Screenrec{
  
  rec() {
   
    let script = [
'set f to ":Users:vruno:Desktop:quicktimeFile.mov"',
'tell application "QuickTime Player"',
'	activate',
'	close every window saving no',
'	set sr to new screen recording',
'	tell sr',
'		start',
'		delay 1 --(seconds)',
'		tell application "QuickTime Player"',
'			set miniaturized of window 1 to true',
'		end tell',
'		delay 5 --(seconds)',
'	end tell',
'end tell',
'tell application "QuickTime Player"',
'	pause document "Screen Recording"',
'end tell',
'tell application "QuickTime Player"',
'	save document "Screen Recording" in file (f)',
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
