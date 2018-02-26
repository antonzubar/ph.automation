'use strict';

var LoginPage = require('./pages/login.page');
var InputPage = require('./pages/input.page');
var using = require('jasmine-data-provider');
var testdata = require('./test_data/users.testdata.js');


using(testdata, function (data) {
    describe(' Login page ' + data.countryCode + ' user: ', function () {
        var page = new LoginPage();
        it(data.UserName + 'user lands on Login page', function () {
            allure.feature('Login/Logout feature');
            expect(browser.getTitle()).toEqual('Login | dash');
        });

        it(' user logins to Swiss dash', function () {
            allure.feature('Login/Logout feature');
            page.typeLogin(data.UserName);
            page.typePassword(data.Password);
            page.loginToDash();

            expect(browser.getTitle()).toEqual(data.PageTitle);
        });

        it(' Check that address is default ', function () {
            page = new InputPage(page);
            page.address.isPresent().then(function (result) {
                if (result) {
                    page.getValue(page.address).then(function (text) {
                       expect(text).toEqual(data.DefaultAddress); 
                    });                    
                }
            });
        });

        it(' user is logged out', function () {
            allure.feature('Login/Logout feature');
            page.logout();
            page = new LoginPage();
            expect(page.loginForm.isPresent()).toBe(true);
        });
    });
});
