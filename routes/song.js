var router = require('express').Router();
var sendMessage = require('../lib/PianoLib').sendMessage;

// ===================================================
// ===================================================

router.post('/like', function(req, res, next) {
  sendMessage("+").then(function (resolve, reject) {
    res.sendStatus("OK");
  }).catch(function (error) {
      res.send(error);
  });
});

router.post('/ban', function(req, res, next) {
  sendMessage("-").then(function (resolve, reject) {
    res.sendStatus("OK");
  }).catch(function (error) {
      res.send(error);
  });
});

router.post('/next', function(req, res, next) {
  sendMessage("n").then(function (resolve, reject) {
    res.sendStatus("OK");
  }).catch(function (error) {
      res.send(error);
  });
});

// internal functions
module.exports = router;
