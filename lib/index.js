// es6 runtime requirements
require('babel/polyfill');
import child_process from 'child_process';
import colors from 'colors';
import fs from 'fs';

export default function screenGifRec({
  time = 5, // seconds
  output = (new Date()).getTime(),
  silent = true
}){
  
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
      if(((new Date()).getTime() - interval) >= time*1e3){
        child.stdin.pause();
        child.kill();
      }
    });
    
    child.on("close", function(){
      toGif(out);
    });
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
      console.log("Done creating gif!".green);
      child.stdin.pause();
      child.kill();
    });
  }
  
  rec();
  
}
