const Five = require("johnny-five");
const Raspi = require("raspi-io").RaspiIO;
// const { startPictureProcess } = require('./startPictureProcess');

class HomeWatcher {
  constructor() {
    this.calibrated = false;
    this.board = new Five.Board({
      io: new Raspi()
    });

    this.setUp();
  }


  board = null // Johnny Five board
  calibrated = null // Calibration of motion detector: boolean
  // motion // Johnny Five motion sensor

  /**
   * Board ready check and motion sensor calibration
   */
  setUp() {
    this.board.on("ready", function(){
      console.log("Board ready!");

      // Set up motion module to use port General Purpose Input/Output port 7 on the Raspberry Pi
      this.motion = new Five.Motion('GPIO7');

      // Make sure motion sensor is properly calibrated
      motion.on("calibrated", function(){
        console.log("Motion sensor calibrated!");
        this.calibrated = true;
      });
    });
  }

  /**
   * Starts event listeners for motion detector
   */
  start() {
    try {
      console.log('Starting motion detection');

      if (this.calibrated) {
        this.motion.on("motionstart", function(){
          console.log("motion started fired");

          // if(calibrated) startPictureProcess();
        });

        this.motion.on("motionend", function(){
          console.log("motion ended fired");
        });

        this.motion.on("change", function(){
          console.log("motion change fired");
        });
      }
    } catch (error) {
      console.error('Error starting motion detector');
      throw new Error(error)
    }
  }
}

const homeWatcher = new HomeWatcher();
homeWatcher.start();