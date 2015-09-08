var router = require('express').Router();
var sendMessage = require('../lib/PianoLib').sendMessage;

router.post('/', function(req, res, next) {
  sendMessage("p").then(function () {
    res.sendStatus("OK");
  }).catch(function (error) {
      res.send(error);
  });
});

module.exports = router;
