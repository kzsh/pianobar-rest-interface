var router = require('express').Router();

var PianoOutoutParser = require('../lib/PianoOutputParser');

var sendMessage = require('../lib/PianoLib').sendMessage;

const { getSelectedStation, getStations } = PianoOutoutParser;



router.get('/', function(req, res, next) {
  sendMessage("s").then(function (data) {
    var json = getStations(data);
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify({ stations: json }));
    sendMessage("\n")
  }).catch(function (error) {
    console.error(error);
    res.sendStatus(500);
  });
});

router.post('/:id', function(req, res, next) {
  var stationMessage = parseInt(req.params.id, 10)
  sendMessage("s" + stationMessage).then(function (data) {
    var json = getSelectedStation(data);
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify(json));
  }).catch(function (error) {
    console.error(error);
    res.sendStatus(500);
  });
});

// internal functions
module.exports = router;
