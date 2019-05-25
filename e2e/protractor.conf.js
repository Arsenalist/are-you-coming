exports.config = {
  chromeDriver: '../node_modules/webdriver-manager/selenium/chromedriver_74.0.3729.6.exe',
  ignoreUncaughtExceptions: false,
  allScriptsTimeout: 11000,
  specs: [
    'features/**/*.feature'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: [
      'features/step_definitions/**/*.steps.ts'
    ]
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
  },
  afterLaunch(exitCode) {
    var q = require('q');
    return q.fcall(function () {
      var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:8080/__admin/shutdown')
      xhr.send('');
    }).delay(1000);
  }
};
