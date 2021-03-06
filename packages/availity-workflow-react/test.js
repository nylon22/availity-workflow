// https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/utils/createJestConfig.js
const jest = require('jest');
const settings = require('availity-workflow-settings');
const Promise = require('bluebird');

// Generates a configuration file for jest to consume from the CLI command.
// The configuration file stubs out
function create() {

  const rootDir = settings.project();

  // TODO: I don't know if it's safe or not to just use / as path separator
  // in Jest configs. We need help from somebody with Windows to determine this.
  const config = {
    collectCoverageFrom: ['**/*.{js,jsx}'],
    coveragePathIgnorePatterns: [
      '/node_modules/',
      '/coverage/'
    ],
    testEnvironment: 'node',
    testURL: 'http://localhost',
    transform: {
      '^.+\\.(js|jsx)$': `${require.resolve('./jest/babel.js')}`,
      '^.+\\.css$': `${require.resolve('./jest/css.js')}`,
      '^(?!.*\\.(js|jsx|css|json)$)': `${require.resolve('./jest/file.js')}`

    },
    transformIgnorePatterns: [
      '[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'
    ],
    testMatch: [
      // Ignore the following directories:
      // build
      //   - the build output directory
      // .cache
      //   - the yarn module cache on Ubuntu if $HOME === rootDir
      // docs
      //   - often used to publish to Github Pages
      // node_modules
      //   - ignore tests in dependencies
      // scripts
      //   - directory generated upon eject
      '<rootDir>/!(build|docs|node_modules|scripts)/**/__tests__/**/*.js?(x)',
      '<rootDir>/!(build|docs|node_modules|scripts)/**/?(*.)(spec|test).js?(x)'
    ],
    globals: settings.globals()
  };

  if (rootDir) {
    config.rootDir = rootDir;
  }

  return config;

}

function unit() {

  const argv = process.argv.slice(2);
  const jestConfig = JSON.stringify(create());
  argv.push(`--config=${jestConfig}`);
  argv.push('--env=jsdom');

  jest.run(argv);

  return Promise.resolve();

}

module.exports = {
  run: unit,
  description: 'Run your tests using Jest'
};

