'use strict';

var LoginPage = function () {
  browser.get('');
};

 LoginPage.prototype = Object.create({}, {
    login: { get: function () { return element(by.model('username')); }},
    password: { get: function () { return element(by.model('password')); }},
    loginButton: { get: function () { return element(by.buttonText("Login")); }},
    typeLogin: { value: function (keys) { return this.login.sendKeys(keys); }},
    typePassword: { value: function (keys) { return this.password.sendKeys(keys); }},
    loginToDash: { value: function () {
    this.loginButton.click();
  }}
});

module.exports = LoginPage;