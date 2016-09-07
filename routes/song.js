var router = require('express').Router();
var sendMessage = require('../lib/PianoLib').sendMessage;

// ===================================================
// ===================================================

router.post('/like', function(req, res, next) {
  sendMessage("+").then(function (resolve, reject) {
    res.sendStatus(200);
  }).catch(function (error) {
    console.error(error);
    res.sendStatus(500);
  });
});

router.post('/ban', function(req, res, next) {
  sendMessage("-").then(function (resolve, reject) {
    res.sendStatus(200);
  }).catch(function (error) {
    console.error(error);
    res.sendStatus(500);
  });
});

router.post('/next', function(req, res, next) {
  sendMessage("n").then(function (resolve, reject) {
    res.sendStatus(200);
  }).catch(function (error) {
    console.error(error);
    res.sendStatus(500);
  });
});
  });
});

// internal functions
module.exports = router;
