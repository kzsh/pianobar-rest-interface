var router = require('express').Router();
var sendMessage = require('../lib/PianoLib').sendMessage;

router.post('/', function(req, res, next) {
  sendMessage("p").then(function (data) {
    res.sendStatus(200);
  }).catch(function (error) {
    res.sendStatus(500);
  });
});

module.exports = router;
