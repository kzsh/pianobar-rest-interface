var express = require('express');
var fs = require('fs');
var Promise = require("bluebird");
var router = express.Router();
var sys = require('sys')
var exec = Promise.promisify(require('child_process').exec);

// ===================================================
// ===================================================
var execAsync = function(cmd) {
  return new Promise(function(resolve, reject) {
    exec(cmd, function(err, stdout) {
      if(err) {
        reject(err);
      //} else if (stdout !== output) {
        //reject(new Error('Output did not match!'));
      } else {
console.log('resolving with', stdout);
        resolve(stdout);
      }
    });
  });
}

// ===================================================
// ===================================================

router.get('/', function (req, res, next) {
  fs.writeFile('/Users/andrew/.config/pianobar/output.out', '', function (err) {
    if (err) throw err;
    child = exec('echo "s" > /Users/andrew/.config/pianobar/ctl',
      function (error, stdout, stderr) {
        //console.log('stdout: ' + stdout);
        //console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }

        fs.readFile('/Users/andrew/.config/pianobar/output.out', 'utf8', function (err,data) {
          if (err) {
            return console.log(err);
          }
          res.send(data);
        });
    });
  });
});

router.post('/:id', function(req, res, next) {
  fs.writeFile('/Users/andrew/.config/pianobar/output.out', '', function (err) {
    if (err) throw err;
    child = exec('echo "s' + parseInt(req.params.id, 10) + '" > /Users/andrew/.config/pianobar/ctl',
      function (error, stdout, stderr) {
        //console.log('stdout: ' + stdout);
        //console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
        res.sendStatus('OK');
    });
  });
});


// internal functions
module.exports = router;
