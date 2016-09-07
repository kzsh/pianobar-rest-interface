var router = require('express').Router();
var sendMessage = require('../lib/PianoLib').sendMessage;

// ===================================================
// ===================================================

router.post('/:id', function(req, res, next) {
  var stationMessage = parseInt(req.params.id, 10)
  sendMessage("s" + stationMessage).then(function () {
    res.sendStatus(200);
  }).catch(function (error) {
    console.error(error);
    res.sendStatus(500);
  });
});

// internal functions
module.exports = router;
