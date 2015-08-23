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
    fs.writeFile(config.dataSourcePath, '', function (err) {
      if (err) throw err;
      child = exec('echo "' + message + '" > ' + config.fifoPath,
        function (error, stdout, stderr) {
          //console.log('stdout: ' + stdout);
          //console.log('stderr: ' + stderr);
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

module.exports = {
  sendMessage: sendMessage
};
