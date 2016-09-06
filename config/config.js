function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

var base = __dirname;

var base = __dirname + "/.."
module.exports = {
  dataSourcePath: base + "/data-stream/output.log",

  //TODO: move and generate this during startup / install
  fifoPath: getUserHome() + "/.config/pianobar/ctl",

  bin: base + "/bin"
}
