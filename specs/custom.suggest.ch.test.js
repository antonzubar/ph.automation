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
        browser.executeScript('window.scrollTo(1300, 900);').then(function(){
            page.scoreQuality.getText().then(function(text){
                expect(text).toBe('0.0');
            });
        });
        page.scoreCondition.getText().then(function(text){
            expect(text).toBe('0.0');
        });
        page.scoreLocation.getText().then(function(text){
            expect(text).toBe('0.0');
        });

        page.editScores.click();
        page.setValueOfField(page.scoreQualityField, 2);
        page.setValueOfField(page.scoreConditionField, 3);
        page.setValueOfField(page.scoreLocationField, 4);
    });
});