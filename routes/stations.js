var router = require('express').Router();
var sendMessage = require('../lib/PianoLib').sendMessage;

function parseData(string) {
  const lines = string.replace(/\0/g,'').replace(/\u001b\[2K(\t|\[\?\])/g, '').split('\n');
  const newStationLine = lines[lines.length - 2];
  const newStationId = Number(newStationLine.match(/\d+/)[0]);

  let newStationName;
  lines.forEach(function(line) {
    if (newStationName) return;

    const stationId = Number(line.match(/\d+/)[0]);
    if (stationId === newStationId) {
      newStationName = line.replace(/\d{1,2}\)\s*q\s*/, '');
    }
  });

  return {
    id: newStationId,
    name: newStationName
  };
}

router.get('/', function(req, res, next) {
  sendMessage("s\n").then(function (data) {
    res.sendStatus(200);
  }).catch(function (error) {
    console.error(error);
    res.sendStatus(500);
  });
});

router.post('/:id', function(req, res, next) {
  var stationMessage = parseInt(req.params.id, 10)
  sendMessage("s" + stationMessage).then(function (data) {
    var json = parseData(data);
    res.send(JSON.stringify(json));
  }).catch(function (error) {
    console.error(error);
    res.sendStatus(500);
  });
});

// internal functions
module.exports = router;
