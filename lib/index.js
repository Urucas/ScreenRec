// es6 runtime requirements
require('babel/polyfill');
import child_process from 'child_process';
import colors from 'colors';
import fs from 'fs';
import keypress from 'keypress';

export default class ScreenRec {

  constructor(options) {
    this.options = {};
    this.options.time = options.time || 10; // seconds
    this.options.output = options.output || (new Date()).getTime(); // output filename
    this.options.silent = options.silent && true;  // hide log
    this.options.togif = options.togif || false; // convert mpg to gif
    this.options.wait4key = options.wait4key || false;  // wait for ctrl + c to stop recording
    this.options.max_rec_time = 30;
    this.options.url = options.url || false;
    this.rec_child;
    this.ext = ".mpg";
  }
  
  rec() {
    
    if(this.options.silent == false) console.log("● Recording screen!".red);
    let out = this.options.output+this.ext;
    
    let self = this;

    // ffmpeg -f avfoundation -i "1:0" out.mpg
    let ffmpeg = "ffmpeg";
    let args  = ['-f','avfoundation','-i',"1:0", out];

    let spawn = child_process.spawn;
    let child = spawn(ffmpeg, args);
  
    let interval = (new Date()).getTime();


    if(this.options.url) {
      if(self.options.silent == false) console.log("Opening url, ".green+this.options.url.green);
      child_process.spawn("open", [this.options.url]);
    }

    child.stderr.on("data", function(data){
      if(self.options.silent == false) console.log(" "+data);
      if(((new Date()).getTime() - interval) >= self.options.time*1e3 && !self.options.wait4key) {
        self.rec_child.stdin.pause();
        self.rec_child.kill();
      }
      if(((new Date()).getTime() - interval) >= self.options.max_rec_time*1e3) {
        process.stdin.pause();
        self.stop();
      }
    });
    
    child.on("close", function(){
      if(self.options.silent == false) console.log("Stopping screen recording".red);
      if(self.options.silent == false) console.log("✓ Done creating video!".green);
      if(self.options.togif) self.toPng(out);
    });

    this.rec_child = child;

    if(this.options.wait4key) this.wait4key();
  }

  stop() {
    
    if(this.rec_child != undefined) {
      this.rec_child.stdin.pause();
      this.rec_child.kill();
    }
  }
  
  wait4key() {
    
    if(this.options.silent == false) console.log("Press [ctrl + c] to stop recording".white);
    let key = keypress(process.stdin);
    let self = this;

    process.stdin.on('keypress', function (ch, key) {
      if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
        self.stop();
      }
    });
  
    process.stdin.setRawMode(true);
    process.stdin.resume();
  }

  toPng(output) {

    if(this.options.silent == false) console.log("Converting mpg into png frames".cyan);

    // ffmpeg -i input.mp4 -r 10 output%05d.png
    let ffmpeg = "ffmpeg";
    let ext = this.ext;
    let args  = ['-i',output,'-r','10','-vf', 'scale=640:480',output.replace(ext, "%05d.png")];

    let spawn = child_process.spawn;
    let child = spawn(ffmpeg, args);
    let self = this;

    child.stderr.on("data", function(data){
      if(self.options.silent == false) console.log(" "+ data);
    });

    child.on("close", function(){
      if(self.options.silent == false) console.log("✓ Done creating png!".green);
      child.stdin.pause();
      child.kill();
      self.toGif(output);
    });
  }
 
  toGif(output) {

    if(this.options.silent == false) console.log("Converting png to gif".cyan);
    
    // convert output*.png output.gif
    let convert = "convert";
    let ext = this.ext;
    let args  = [output.replace(ext, "*.png"),'-fuzz',"40%",'-layers', 'OptimizeFrame',output.replace(ext,".gif")];

    let spawn = child_process.spawn;
    let child = spawn(convert, args);
    let self = this;

    child.stderr.on("data", function(data){
      if(self.options.silent == false) console.log(" "+ data);
    });
    
    child.on("close", function(){
      if(self.options.silent == false) console.log("✓ Done creating gif!".green);
      child.stdin.pause();
      child.kill();
      self.removeGarbage(output);
    });
    
  }

  removeGarbage(output) {
    
    if(this.options.silent == false) console.log("Removing garbage".cyan);
    
    // rm output*.png
    let ext = this.ext;
    let name = output.replace(ext, "");
    let list = fs.readdirSync("./");
    let regEx = new RegExp(name);
    
    for(let i in list) {
      let file = list[i];
      if(regEx.test(file) && /\d+.png$/.test(file)) {
        fs.unlinkSync(file);
      }
    }
    
  }
}
