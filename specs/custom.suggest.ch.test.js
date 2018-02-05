var LoginPage = require('./pages/login.page');
var InputPage = require('./pages/input.page');
var using = require('jasmine-data-provider');
var users_data = require('./test_data/users.testdata.js');

var page = new LoginPage();
page.typeLogin(users_data[0].UserName);
page.typePassword(users_data[0].Password);
page.loginToDash();

describe('Custom scores for Input: ', function () {
    it('user lands on Input page', function () {
        allure.feature('Input page');
        page = new InputPage(page);

        //Scroll down and verify that initial values are 0.
        browser.executeScript('window.scrollTo(100000, 100000);').then(function () {
            page.scoreQuality.getText().then(function (text) {
                expect(text).toBe('0.0');
            });
            page.scoreCondition.getText().then(function (text) {
                expect(text).toBe('0.0');
            });
            page.scoreLocation.getText().then(function (text) {
                expect(text).toBe('0.0');
            });
        });

        //Set custom QCL values by moving sliders
        browser.actions().dragAndDrop(
            page.scoreQualitySlider,
            {x: 22, y: 0}
        ).perform();

        browser.actions().dragAndDrop(
            page.scoreConditionSlider,
            {x: 35, y: 0}
        ).perform();

        browser.actions().dragAndDrop(
            page.scoreLocationSlider,
            {x: 75, y: 0}
        ).perform();

        //remember new QCL values
        var manualQuality, manualCondition, manualLocation;
        page.scoreQualitySlider.getAttribute('aria-valuenow').then(function (text) {
            manualQuality = text;
        });
        page.scoreConditionSlider.getAttribute('aria-valuenow').then(function (text) {
            manualCondition = text;
        });
        page.scoreLocationSlider.getAttribute('aria-valuenow').then(function (text) {
            manualLocation = text;
        });

        //click save and verify that changes are saved
        page.saveQCL.click();
        browser.sleep(5000);

        page.scoreQuality.getText().then(function (text) {
            expect(+text).toBe(+manualQuality);
        });
        page.scoreCondition.getText().then(function (text) {
            expect(+text).toBe(+manualCondition);
        });
        page.scoreLocation.getText().then(function (text) {
            expect(+text).toBe(+manualLocation);
        });

    }, 24000);
});