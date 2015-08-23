var router = require('express').Router();
var PianoLib = require('../lib/PianoLib')
var startup = PianoLib.startup;
var shutdown = PianoLib.shutdown;

// ===================================================
// ===================================================

router.post('/off', function(req, res, next) {
  shutdown()
  .then(function (resolve, reject) {
    res.sendStatus("OK");
  }).catch(function (error) {
      res.send(error);
  });
});

router.post('/on', function(req, res, next) {
  startup()
  .then(function (resolve, reject) {
    res.sendStatus("OK");
  }).then(function () {
    return PianoLib.sendMessage("6");
  }).catch(function (error) {
      res.send(error);
  });
});

// internal functions
module.exports = router;
