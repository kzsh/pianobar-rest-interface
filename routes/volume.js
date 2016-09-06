var router = require('express').Router();
var sendMessage = require('../lib/PianoLib').sendMessage;

// ===================================================
// ===================================================

router.post('/up', function(req, res, next) {
  sendMessage(")").then(function (resolve, reject) {
    res.sendStatus("200");
  }).catch(function (error) {
    console.error(error);
    res.sendStatus("500");
  });
});

router.post('/down', function(req, res, next) {
  sendMessage("(").then(function (resolve, reject) {
    res.sendStatus("200");
  }).catch(function (error) {
    console.error(error);
    res.sendStatus("500");
  });
});

router.post('/reset', function(req, res, next) {
  sendMessage("0").then(function (resolve, reject) {
    res.sendStatus("200");
  }).catch(function (error) {
    console.error(error);
    res.sendStatus("500");
  });
});

// internal functions
module.exports = router;
