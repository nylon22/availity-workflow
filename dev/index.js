var argv = require('yargs').argv;

var commands = {
  lint: require('./lint'),
  release: require('./release'),
  copy: require('./copy'),
  build: require('./build')
};

commands[argv.command]();
