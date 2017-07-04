# screenrec <img src="https://travis-ci.org/Urucas/ScreenRec.svg?branch=master" />
osx simple screen recording module


Installation
============
```npm install --save screenrec```

Usage
=====
```javascript
import ScreenRec from 'ScreenRec';

let sr = new ScreenRec({time:10});
    sr.rec();
    
```

Settings
========
```javascript
let sr = new ScreenRec({
  time,     // seconds
  output,   // output filename
  silent,   // hide log
  togif,    // convert mpg to gif
  wait4key,  // wait for ctrl + c to stop recording
  url       // opens an url into the default browser to record
});
```

Examples
========
ScreenRec is build on ES6 make sure to convert to ES5 to test the examples

```bash
make clean && make
node examples/wait4key.js
```

====================
<img src="https://raw.githubusercontent.com/Urucas/ScreenRec/master/examples/example.gif" width="640" height="auto" />
