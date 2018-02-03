'use strict';

var LoginPage = require('./pages/login.page');
var InputPage = require('./pages/input.page');

describe('User is able to Logout through dash.', function () {
    var page;
    allure.feature('Login/Logout feature');
    
    it('User lands on Login page', function () {
        page = new LoginPage();
        page.typeLogin('');
        page.typePassword('');
        page.loginToDash();

        expect(browser.getTitle()).toEqual('Immobilien Info | dash');
    });

    it('User clicks Logout button and go to Login page', function () {
        allure.feature('Login/Logout feature');
        page = new InputPage();
        page.logout();
        expect(browser.getTitle()).toEqual('Login | dash');
    });
});