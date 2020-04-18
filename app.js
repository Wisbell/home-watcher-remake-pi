const HomeWatcher = require('./home-watcher');

try {
  const homeWatcher = new HomeWatcher();
  homeWatcher.run();
} catch (error) {
  console.error(error);
  // TODO: Send a message to parent (Rpi Server) telling it to set home watcher status to down
  // process.send('');
} finally {

}