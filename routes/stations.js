var router = require('express').Router();
var sendMessage = require('../lib/PianoLib').sendMessage;

function cleanArray(actual){
  var newArray = [];
  for(var i = 0; i<actual.length; i++){
      if (actual[i]){
        newArray.push(actual[i]);
    }
  }
  return newArray;
}
// ===================================================
// ===================================================

router.get('/', function (req, res, next) {
  sendMessage("s").then(function (data) {
      var dataList = data.split("\n");
      dataList = dataList.slice(1,dataList.length);
      var list = dataList.map(function (item) {
        var result = item.match(/q/);
        console.log(result);
        return item;
      });
    list = cleanArray(list)
    console.log(list)
    res.send(list);
  });
});

router.post('/:id', function(req, res, next) {

  sendMessage("s"+ parseInt(req.params.id,10)).then(function (data) {
    res.send(data);
  });
});

// internal functions
module.exports = router;
