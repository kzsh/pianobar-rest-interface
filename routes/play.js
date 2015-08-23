var express = require('express');
var fs = require('fs');
var router = express.Router();
var exec = require('child_process').exec;
/* GET users listing. */
router.post('/', function(req, res, next) {

  fs.writeFile('/Users/andrew/.config/pianobar/output.out', '', function (err) {
    if (err) throw err;
    child = exec('echo "p" > /Users/andrew/.config/pianobar/ctl',
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

module.exports = router;
