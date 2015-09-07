var config = require('../config/config.js');
var Promise = require("bluebird");
var fs = Promise.promisifyAll(require('fs'));
var execAsync = Promise.promisify(require('child_process').exec);

var messageMap = {
  'play': 'p',
  'pause': 'p',
  'station': 's',
  'volume_up': ')',
  'volume_down': '(',
  'volume_reset': '0'
};

function sendMessage (message) {
    return fs.truncateAsync(config.dataSourcePath, 0)
      .then(execAsync('echo "' + message + '" > ' + config.fifoPath))
      .then(fs.readFileAsync(config.dataSourcePath, 'utf8'))
      .catch(function (err) {
        console.log(err);
      });
};

function shutdown () {
  return execAsync(config.bin + "/pianobar-stop")
  .then(function (result) {
    return result;
  })
  .catch(function (error) {
    throw new Error(error);
  });
}

function startup () {
  return execAsync(config.bin + "/pianobar-start")
  .then(function (result) {
    return result;
  })
  .catch(function (error) {
    throw new Error(error);
  });
}

module.exports = {
  sendMessage: sendMessage,
  startup: startup,
  shutdown: shutdown
};
