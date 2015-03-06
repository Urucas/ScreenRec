# screenrec [![Build Status](https://travis-ci.org/Urucas/screenrec.svg?branch=master)](https://travis-ci.org/Urucas/screenrec)
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
  togif,    // convert avi to gif
  wait4key  // wait for ctrl + c to stop recording
});
```

Examples
========
ScreenRec is build on ES6 make sure to convert to ES5 to test the examples

```bash
make clean && make
node examples/wait4key.js
```
