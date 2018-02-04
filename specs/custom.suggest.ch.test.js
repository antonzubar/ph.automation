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
        page.scoreQuality.getText().then(function(text){
            console.log(text)
        })
    });
});