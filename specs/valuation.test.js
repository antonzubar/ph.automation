'use strict';

var LoginPage = require('./pages/login.page');
var InputPage = require('./pages/input.page');
var OverviewPage = require('./pages/overview.page');

describe('Valuation test ', function () {
    var page;
    allure.feature('Valuation');

    it('User lands on Login page', function () {
        page = new LoginPage();
        page.typeLogin('');
        page.typePassword('');
        page.loginToDash();

        expect(browser.getTitle()).toEqual('Immobilien Info | dash');
    });

    it('User sets property values and clicks Get Valuation', function () {
        page = new InputPage(page);
        page.subType.click();
        page.choosePropertyType(3);
        page.setValueOfField(page.buildingYear, 2015);
        page.setValueOfField(page.livingArea, 250);
        page.setValueOfField(page.floorNumber, 1);
        page.floorNumber.sendKeys(protractor.Key.ENTER);
        page.lift.click();

        browser.executeScript('window.scrollTo(1300, 900);').then(function () {
            page.setQualityOfKitchen(1);
        });
        page.setQualityOfKitchen(1);
        page.setQualityOfBathrooms(2);
        page.setQualityOfFloor(3);
        page.setQualityOfWindows(4);
        page.getValuation.click();
    });

    it('User lands on Overveiw and sees valuation ', function () {
        page = new OverviewPage(page);
        expect(browser.getTitle()).toEqual('Überblick | dash');
    });
});

