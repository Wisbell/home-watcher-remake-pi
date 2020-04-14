const { exec } = require("child_process");
const path = require('path');

/**
 * Create file name using current date.
 * Removes parenthesis and colon in order to be worked with on a windows file system
 * @returns {string} Current date as file name
 */
let createFileNameAsDate = () => {
  let date = new Date();
  return date.toString()
    .replace("(", "")
    .replace(")", "")
    .replace(/:/g, '-')
    .split(" ")
    .join("_") + ".jpg";
}

/**
 * Takes picture with raspbian raspistill command line utility.
 * @returns {string} Path to new picture
 */
module.exports.takePicture = () => {
  return new Promise( (resolve, reject) => {

    // Create argument to pass to execute raspistill
    let fileName = createFileNameAsDate();
    console.log('fileName', fileName);
    let createPath = path.join(process.cwd(), fileName);
    let cameraArgument = [ "/opt/vc/bin/raspistill", "-vf -hf", "-n", "-q 10", "-t 1", "-o", createPath ].join(" ");

    exec(cameraArgument, (err, stdout, stderr) => {
      if(err) {
        console.log("error", err);
        reject(err);
      }
      console.log('Done taking picture');
      resolve(createPath);
    });
  });
}
