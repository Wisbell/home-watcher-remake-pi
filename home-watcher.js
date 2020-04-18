/*
  TODO: Start function may need to be async to properly handle errors with a try/catch or just do .catch on
        the startPictureProcess function.
*/

const Five = require("johnny-five");
const Raspi = require("raspi-io").RaspiIO;
const { startPictureProcess } = require('./modules/startPictureProcess');

// NOTE: This is necessary so nested functions can make use of the class instance 'this'
//        Possible fix in TODO or do more research on binding in javascript
let homeWatcherThis; // TODO: https://github.com/sindresorhus/auto-bind

class HomeWatcher {
  constructor() {
    this.board = new Five.Board({
      io: new Raspi()
    });
    homeWatcherThis = this;
  }

  board; // Johnny Five board
  motion; // Johnny Five motion sensor
  calibratred = false; // Motion sensor is calibrated: boolean

  run() {
    this.setUpAndStart();
  }

  /**
   * Board ready check and motion sensor calibration
   */
  setUpAndStart() {
    this.board.on("ready", function(){
      console.log("Board ready!");

      // Set up motion module to use port General Purpose Input/Output port 7 on the Raspberry Pi
      homeWatcherThis.motion = new Five.Motion('GPIO7');

      // Make sure motion sensor is properly calibrated
      homeWatcherThis.motion.on("calibrated", function(){
        console.log("Motion sensor calibrated!");
        homeWatcherThis.calibratred = true;

        if(homeWatcherThis.calibratred)
          homeWatcherThis.start();
      });
    });
  }

  /**
   * Starts event listeners for motion detector
   */
  start() {
    try {
      console.log('Starting motion detection');

      this.motion.on("motionstart", function(){
        console.log("motion started fired");

        startPictureProcess()
          .catch(error => {
            console.error(error);
          });
      });

      this.motion.on("motionend", function(){
        console.log("motion ended fired");
      });

      // Note: Keeping for possible future use
      // homeWatcherThis.motion.on("change", function(){
      //   console.log("motion change fired");
      // });

    } catch (error) {
      console.error('Error starting motion detector');
      // TODO: Send a message to parent (Rpi Server) telling it to set home watcher status to down
      // process.send('');
      throw new Error(error);
    }
  }
}

module.exports = HomeWatcher;