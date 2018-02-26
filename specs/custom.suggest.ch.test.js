var LoginPage = require('./pages/login.page');
var InputPage = require('./pages/input.page');
var users_data = require('./test_data/users.testdata.js');
var qcl_default_data = require('./test_data/ch.input.default.values.testdata.js');

describe('Custom scores for Input: ', function () {
    var page = new LoginPage();
    var manualQuality, manualCondition, manualLocation;

    beforeAll(function () {
        page.typeLogin(users_data[0].UserName);
        page.typePassword(users_data[0].Password);
        page.loginToDash();
    });

    it(' Custom Quality Score is saved', function () {
        allure.feature('Input page');
        page = new InputPage(page);

        //Scroll down and go to custom score input. Save default custom scores.
        browser.executeScript("arguments[0].scrollIntoView();", page.getValuation.getWebElement()).then(function () {
            page.editScores.click();

            //remember new QCL values
            page.getScore(page.scoreQualitySlider).then(function (text) {
                manualQuality = text;
            });

            page.getScore(page.scoreConditionSlider).then(function (text) {
                manualCondition = text;
            });

            page.getScore(page.scoreLocationSlider).then(function (text) {
                manualLocation = text;
            }).then(function () {
                page.saveQCL.click();
            })
        });


        //Verify that default custom QCL values are saved
        page.waitForScore(page.scoreQuality, qcl_default_data[0].Quality);
        page.scoreQuality.getText().then(function (text) {
            expect(+text).toBe(+manualQuality);
        });
    }, 24000);

    it('Custom Condition Score is saved', function () {
        page.waitForScore(page.scoreCondition, qcl_default_data[0].Condition);
        page.scoreCondition.getText().then(function (text) {
            expect(+text).toBe(+manualCondition);
        });
    });

    it('Custom Location Score is saved', function () {
        page.waitForScore(page.scoreLocation, qcl_default_data[0].Location);
        page.scoreLocation.getText().then(function (text) {
            expect(+text).toBe(+manualLocation);
        });
    });

    afterAll(function () {
        page.logout();
        page = new LoginPage();
    });
});