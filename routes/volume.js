var router = require('express').Router();
var sendMessage = require('../lib/PianoLib').sendMessage;

// ===================================================
// ===================================================

router.post('/up', function(req, res, next) {
  sendMessage(")").then(function (resolve, reject) {
    res.sendStatus("OK");
  }).catch(function (error) {
      res.send(error);
  });
});

router.post('/down', function(req, res, next) {
  sendMessage("(").then(function (resolve, reject) {
    res.sendStatus("OK");
  }).catch(function (error) {
      res.send(error);
  });
});

router.post('/reset', function(req, res, next) {
  sendMessage("0").then(function (resolve, reject) {
    res.sendStatus("OK");
  }).catch(function (error) {
      res.send(error);
  });
});

// internal functions
module.exports = router;
