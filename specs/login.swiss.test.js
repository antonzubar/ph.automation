'use strict';

var LoginPage = require('./pages/login.page');
var InputPage = require('./pages/input.page');
var using = require('jasmine-data-provider');
var testdata = require('./test_data/users.testdata.js');
var loginAppData = require('./app_data/login.appdata.json');

using(testdata, function (data) {
    describe(' Login page ' + data.countryCode + ' user: ', function () {
        var page = new LoginPage();
        it(data.UserName + 'user lands on Login page', function () {
            allure.feature('Login/Logout feature');
            expect(browser.getTitle()).toEqual(loginAppData.PageTitle);
        });

        it(data.UserName + ' user logins to Swiss dash', function () {
            allure.feature('Login/Logout feature');
            page.typeLogin(data.UserName);
            page.typePassword(data.Password);
            page.loginToDash();

            expect(browser.getTitle()).toEqual(data.PageTitle);
        });

        it(data.UserName + ' Check that address is default ', function () {
            page = new InputPage(page);
            page.getValue(page.address).then(function (text) {
                expect(text).toEqual(data.DefaultAddress);
            });
        });

        it(data.UserName + ' user is logged out', function () {
            allure.feature('Login/Logout feature');
            page.logout();
            page = new LoginPage();
            expect(page.loginForm.isPresent()).toBe(true);
        });
    });
});


