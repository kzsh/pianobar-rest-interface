var router = require('express').Router();
var PianoLib = require('../lib/PianoLib')
var startup = PianoLib.startup;
var shutdown = PianoLib.shutdown;

// ===================================================
// ===================================================

router.post('/off', function(req, res, next) {
  shutdown()
  .then(function (resolve, reject) {
    res.sendStatus(200);
  }).catch(function (error) {
    console.error(error);
    res.sendStatus(500);
  });
});

router.post('/on', function(req, res, next) {
  startup()
  .then(function (resolve, reject) {
    res.sendStatus(200);
  }).then(function () {
    return PianoLib.sendMessage("6");
  }).catch(function (error) {
    console.error(error);
    res.sendStatus(500);
  });
});

// internal functions
module.exports = router;
