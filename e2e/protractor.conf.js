// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
var HtmlScreenshotReporter =require('../node_modules/protractor-jasmine2-screenshot-reporter');
var reporter = new HtmlScreenshotReporter({
    dest: './src/data/screenshots',
    filename: 'my-report.html',
    reportOnlyFailedSpecs: false,
    captureOnlyFailedSpecs: true
});
exports.config = {
  allScriptsTimeout: 11000,
  multiCapabilities: [
    {
      browserName: 'chrome',
      specs: ['./src/**/writer.e2e-spec.ts'],
      chromeOptions: { args: ['--headless', '--disable-gpu', '--window-size=800,600'] }
    },
    {
      browserName: 'chrome',
      specs: ['./src/**/*.e2e-spec.ts'],
      exclude: ['./src/**/writer.e2e-spec.ts']
    }
  ],

  // capabilities: {
  //   browserName: 'chrome',
  //   specs: ['./src/**/*.e2e-spec.ts'],
  //   exclude: ['./src/**/writer.e2e-spec.ts']
  // },

  maxSessions: 1,
  /**
   * used when browser needs to be closed and reopened
   */
  // restartBrowserBetweenTests: true,
  directConnect: true,
  baseUrl: 'http://10.48.133.179:9090',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 300000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(reporter,new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
