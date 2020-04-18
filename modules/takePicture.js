const { execSync } = require("child_process");
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
 * Takes picture with raspbian raspistill command line utility
 * and saves it to provided path on the file system.
 * @returns {string} Path to new picture
 */
module.exports.takePicture = () => {
  try {
    // Create filePath argument to pass to raspistill executable
    const fileName = createFileNameAsDate();
    console.log('fileName', fileName);
    const createPath = path.join(process.cwd(), 'images', fileName);
    console.log('createPath', createPath);
    let cameraArgument = [ "/opt/vc/bin/raspistill", "-vf -hf", "-n", "-q 10", "-t 1", "-o", createPath ].join(" ");

    execSync(cameraArgument, (err, stdout, stderr) => {
      if(err) {
        console.log("err", err);
        throw err;
      }
      console.log('Done taking picture');
    });

    return createPath;
  } catch (error) {
    throw error;
  } 
}
