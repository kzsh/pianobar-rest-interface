function getStations(rawOutput) {
  const lines = outputAsArray(sanitizeLogOutput(rawOutput));
  console.log(lines);
  return _getStationObjects(lines);
}

function getSelectedStation(rawOutput) {
  const lines = outputAsArray(sanitizeLogOutput(rawOutput));
  const newStationId = _getNewStationId(lines);
  const stations = _getStationObjects(lines);

  return stations.reduce(function(accum, station) {
    if (accum) {
      return accum;
    } else if (station.id === newStationId) {
      return station;
    }
  }, undefined);
}

/**
 * Get an object representing a station, parsed from
 * log output.
 *
 * @private
 * @params {String} line a line of the lines array
 * @returns {Object} the station `{id:Number, name:String}`
 */
function _getStationNameAndIdFromLine(line) {
  const stationId = Number(line.match(/\d+/)[0]);
  const stationName = line.replace(/\d+\)\s*[qQ]?\s*/, '');

  return {
    id: stationId,
    name: stationName
  };
}

function _getNewStationId(lines) {
  const newStationLine = lines[lines.length - 2];
  return _getStationNameAndIdFromLine(newStationLine).id;
}
/**
 * get a list of objects for each station listed in the output
 * @private
 */
function _getStationObjects(outputArray) {
  const stationEndIndex = outputArray.length - 2;

  return outputArray.slice(0, stationEndIndex)
    .map(_getStationNameAndIdFromLine);
}

/**
 *
 * @private
 * @param {String} string the line of output to clean up.
 * @returns {String} the sanitized string.
 */
function sanitizeLogOutput(string) {
  return string.replace(/\0/g,'').replace(/\u001b\[2K(\t|\[\?\])/g, '');
}

function outputAsArray(output) {
  return output.split('\n');
}

module.exports = {
  getSelectedStation: getSelectedStation,
  getStations: getStations
}
