// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

// eslint:disable-next-line
const {SpecReporter} = require('jasmine-spec-reporter');

var HtmlScreenshotReporter = require('../node_modules/protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlScreenshotReporter({
    dest: './src/data/screenshots',
    filename: 'my-report.html',
    reportOnlyFailedSpecs: false,
    captureOnlyFailedSpecs: true
});

exports.config = {
    // for remote capability uncomment below 2 lines and start selenium server in 10.48.130.156 machine
    // seleniumAddress: 'http://10.48.130.156:4444/wd/hub',
    // directConnect: false,
    directConnect: true,
    allScriptsTimeout: 11000,
    // multiCapabilities: [
    // {
    //     browserName: 'chrome',
    //     acceptInsecureCerts: true,
    //     marionette: true,
    //     acceptInsecureCerts: true,
    //     specs: ['./src/**/writer.e2e-spec.ts'],
    //     chromeOptions: {args: ['--headless', '--disable-gpu', '--window-size=800,600']}
    // },
    //     {
    //         browserName: 'chrome',
    //
    //         acceptInsecureCerts: true,
    //         marionette: true,
    //         acceptInsecureCerts: true,
    //         specs: [
    //             './src/tests/rams/*.*',
    //             './src/**/cnr-generic.e2e-spec.ts',
    //             './src/**/*cnr-client-setup.e2e-spec.ts',
    //             './src/**/cnr-client-layout-setup.e2e-spec.ts',
    //             './src/**/cnr-workflow.e2e-spec.ts'],
    //         exclude: ['./src/**/writer.e2e-spec.ts']
    //     }
    // ],

    capabilities: {
        browserName: 'chrome',
        acceptInsecureCerts: true,
        specs: [
            './src/tests/rams/*.*',
            './src/**/cnr-generic.e2e-spec.ts',
            './src/**/*cnr-client-setup.e2e-spec.ts',
            './src/**/cnr-client-layout-setup.e2e-spec.ts',
            './src/**/cnr-workflow.e2e-spec.ts'
        ],
        exclude: ['./src/**/writer.e2e-spec.ts']
    },

    maxSessions: 1,
    /**
     * used when browser needs to be closed and reopened
     */
    // restartBrowserBetweenTests: true,
    baseUrl: 'https://10.48.133.180:9090',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 300000,
        print: function () {
        }
    },
    onPrepare() {
        require('ts-node').register({
            project: require('path').join(__dirname, './tsconfig.e2e.json')
        });
        jasmine.getEnv().addReporter(reporter, new SpecReporter({spec: {displayStacktrace: true}}));
    }
};
