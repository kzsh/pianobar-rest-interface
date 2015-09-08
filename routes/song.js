var router = require('express').Router();
var sendMessage = require('../lib/PianoLib').sendMessage;
var readLog = require('../lib/PianoLib').readLog;

// ===================================================
// ===================================================

router.get('/', function(req, res, next) {
  readLog(2).then(function (data) {
    console.log(data)
    res.send(data);
  }).catch(function (error) {
      res.send(error);
  });
});

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
