var config = require('../config/config.js');
var fs = require('fs');
var Promise = require("bluebird");
var exec = Promise.promisify(require('child_process').exec);

var messageMap = {
  'play': 'p',
  'pause': 'p',
  'station': 's',
  'volume_up': ')',
  'volume_down': '(',
  'volume_reset': '0'
};

function sendMessage (message) {
  return new Promise(function (resolve, reject) {
    fs.truncate(config.dataSourcePath, 0, function (err) {
      if (err) throw err;
      child = exec('echo "' + message + '" > ' + config.fifoPath,
        function (error, stdout, stderr) {
          if (error !== null) {
              reject(err);
          }

          fs.readFile(config.dataSourcePath, 'utf8', function (err,data) {
            if (err) {
              reject(err);
            }
            resolve(data)
          });
      });
    });
  });
};

function shutdown () {
  console.log('sd')
  return exec(config.bin + "/pianobar-stop")
  .then(function (result) {
    return result;
  })
  .catch(function (error) {
    throw new Error(error);
  });
}

function startup () {
  console.log('su')
  return exec(config.bin + "/pianobar-start")
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
