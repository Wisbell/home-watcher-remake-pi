// NOTE: Keeping this for possible future use.

const Five = require("johnny-five");
const Raspi = require("raspi-io").RaspiIO;


export class HomeWatcher {

  board = new Five.Board({
    io: new Raspi()
  });

  motion = new Five.Motion('GPIO7');
  calibrated = false;


  setupAndStart () {
    this.setup();
  }

  setup () {
    console.log('Setting up home watcher app');

    try {
      this.board.on("ready", function(){
        console.log("Board ready");

        this.motion.on("calibrated", function(){
          console.log("Calibration completed");
          calibrated = true;
          this.start();
        });

      });
    } catch (error) {
      console.log('Error setting up home watcher app');
      console.error(error);
    }
  }

  start () {
    console.log("Starting motion event listeners");

    try {
      this.motion.on("motionstart", function(){
        console.log("motion started");

        if(calibrated) {
          console.log('Start picture process');
        }

      });

      this.motion.on("motionend", function(){
        console.log("motion ended");
      });

      this.motion.on("change", function(){
        console.log("change fired");
      });
    } catch (error) {
      console.log('Error starting motion event listeners');
      console.error(error);
    }
  }
}