import ScreenRec from '../lib/';

describe("Screenrec test", () => {
  
  it("Test ScreenRec options are setted", (done) => {

    let app = new ScreenRec({
      time: 12,
      output: "output",
      silent: false,
      togif: true,
      wait4key: true
    });

    let options = app.options;
    if(options.time != 12) throw new Error("Error setting time param!");
    if(options.output != "output") throw new Error("Error setting output param!");
    if(options.silent != false) throw new Error("Error setting silent param!");
    if(options.togif != true) throw new Error("Error setting togif param!");
    if(options.wait4key != true) throw new Error("Error setting wait4key param!");
    done();
  });

  it("Test ScreenRec stop method", (done) => {
      
    let app = new ScreenRec({wait4key:true});
    app.rec();
    app.stop();
    if(app.rec_child.killed != true)
      throw new Error("Stop method not killing child, run: killall ffmpeg");

    done();

  });
  
});
  
