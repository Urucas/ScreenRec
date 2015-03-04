// es6 runtime requirements
require('babel/polyfill');
import child_process from 'child_process';
import colors from 'colors';
import fs from 'fs';
import keypress from 'keypress';

export default function screenrec({
  time = 10,                       // seconds
  output = (new Date()).getTime(), // output filename
  silent = true,                   // hide log
  togif = true,                    // convert avi to gif
  wait4key = false                 // wait for ctrl + c to stop recording
}){
  
  let _child;
  let max_rec_time = 30;

  let rec = () => {
    
    console.log("● Recording screen!".red);
    let out = output+".avi";
    
    // ffmpeg -f avfoundation -i "1:0" out.avi
    let ffmpeg = "ffmpeg";
    let args  = ['-f','avfoundation','-i',"1:0",out];

    let spawn = child_process.spawn;
    let child = spawn(ffmpeg, args);
  
    let interval = (new Date()).getTime();
    let self = this;
  
    child.stderr.on("data", function(data){
      if(silent == false) console.log(" "+data);
      if(((new Date()).getTime() - interval) >= time*1e3 && !wait4key) {
        _child.stdin.pause();
        _child.kill();
      }
      if(((new Date()).getTime() - interval) >= max_rec_time*1e3) {
        process.stdin.pause();
        stop();
      }
    });
    
    child.on("close", function(){
      console.log("Stopping screen recording".red);
      console.log("✓ Done creating video!".green);
      if(togif) toGif(out);
    });

    _child = child;

    if(wait4key) wait4key();
  }

  let stop = () => {
    
    if(_child != undefined) {
      _child.stdin.pause();
      _child.kill();
    }
  }
  
  let wait4key = () => {
    
    console.log("Press [ctrl + c] to stop recording".white);
    let key = keypress(process.stdin);

    process.stdin.on('keypress', function (ch, key) {
      if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
        stop();
      }
    });
  
    process.stdin.setRawMode(true);
    process.stdin.resume();
  }

  let toGif = (output) => {

    console.log("Converting avi to gif".cyan);

    // ffmpeg -i video.avi -t 10 out%02d.gif
    let ffmpeg = "ffmpeg";
    let args  = ['-i',output,'-t',"10",output.replace("avi", "gif")];

    let spawn = child_process.spawn;
    let child = spawn(ffmpeg, args);

    child.stderr.on("data", function(data){
      if(silent == false) console.log(" "+ data);
    });

    child.on("close", function(){
      console.log("✓ Done creating gif!".green);
      child.stdin.pause();
      child.kill();
    });
  }
  
  rec();
}
