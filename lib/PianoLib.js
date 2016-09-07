var config = require('../config/config.js');
var Promise = require("bluebird");
var fs = Promise.promisifyAll(require('fs'));
var exec = require('child_process').exec;

function promiseFromChildProcess(child) {
  return new Promise(function (resolve, reject) {
    child.addListener("error", reject);
    child.addListener("exit", function() {
      fs.readFile(config.dataSourcePath, 'utf8', function (err,data) {
        if (err) {
          reject(err);
        } else {
          resolve(data)
        }
      });
    });
  });
}

var messageMap = {
  'play': 'p',
  'pause': 'p',
  'station': 's',
  'volume_up': ')',
  'volume_down': '(',
  'volume_reset': '0'
};

function sendMessage (message) {
  fs.truncateSync(config.dataSourcePath, 0);
  return promiseFromChildProcess(
    exec('echo "' + message + '" > ' + config.fifoPath)
  );
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
