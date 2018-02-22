exports.config = {
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ["--headless", "--disable-gpu", "--incognito"]
        }
    },
    framework: 'jasmine2',
    //seleniumAddress: 'http://localhost:4444/wd/hub',  //this creates standalone server which will alive after tests
    specs: ['./specs/ch.overview.scores.test.js'],  //specify scope of tests
    baseUrl: 'https://xdash.pricehubble.net/login', //add here URL for testing
//------------------ Delete folder with previous results before launch---------------------
    beforeLaunch: function () {
        var del = require('del');
        del('./allure-results');
    },
//------------------ Adding Allure reporter ---------------------
    onPrepare: function () {
        var AllureReporter = require('jasmine-allure-reporter');		
        browser.driver.manage().window().setSize(1680, 1050);
        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: 'allure-results'
        }));
        jasmine.getEnv().afterEach(function (done) {
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function () {
                    return new Buffer(png, 'base64')
                }, 'image/png')();
                done();
            });
        });
    }
};
