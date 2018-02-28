var LoginPage = require('./pages/login.page');
var LeftMenu = require('./pages/left.menu.page');
var InputPage = require('./pages/input.page');
var users_data = require('./test_data/users.testdata.js');
var OverviewPage = require('./pages/overview.page');
var NoisePage = require('./pages/noise.page');
var ViewPage = require('./pages/view.page');
var ImmissionsPage = require('./pages/immissions.page');
var ShoppingPage = require('./pages/shopping.page');
var FamilyPage = require('./pages/family.page');
var NoiseAppData = require('./app_data/noise.appdata.json');
var ViewAppData = require('./app_data/view.appdata.json');
var ImmisionsAppData = require('./app_data/immisions.appdata.json');
var ShopsAppData = require('./app_data/shops.appdata.json');
var FamilyAppData = require('./app_data/family.appdata.json');

describe('Navigation from Overview to Score pages: ', function () {
    var page = new LoginPage();

    beforeAll(function () {
        page.typeLogin(users_data[0].UserName);
        page.typePassword(users_data[0].Password);
        page.loginToDash();
    });

    it(' User logins and go to Noise page', function () {
        allure.feature('Input page');
        page = new InputPage(page);

        page.setValueOfField(page.buildingYear, page.getRandomInteger("1850~2018"));
        page.setValueOfField(page.livingArea, page.getRandomInteger("1~500"));
        page.setValueOfField(page.floorNumber, page.getRandomInteger("0~20"));
        page.setValueOfField(page.numberOfRooms, page.getRandomInteger(""));

        //Scroll down and verify that initial values are 0.
        browser.executeScript("arguments[0].scrollIntoView();", page.getValuation.getWebElement()).then(function () {
            page.clickButton(page.getValuation)
        }).then(function () {
            page = new OverviewPage(page);

            //Navigate to Noise page
            page.noiseScore.click().then(function () {
                page = new NoisePage;
                page.noiseLabel.getText().then(function (text) {
                    expect(String(text)).toBe(NoiseAppData.MainLabel);
                    page = new LeftMenu(page);
                    page.menuOverview.click();
                })
            });

        });
    }, 240000);

    it('Check that user navigates to View page', function () {
        //Navigate to View page
        page = new OverviewPage(page);

        page.viewScore.click().then(function () {
            page = new ViewPage(page);
            page.viewLabel.getText().then(function (text) {
                expect(String(text)).toBe(ViewAppData.MainLabel);
                page = new LeftMenu(page);
                page.menuOverview.click();
            })
        });
    }, 20000);

    it('Check that user navigates to Immisions page', function () {
        //Navigate to Immissions page
        page = new OverviewPage(page);

        page.immisionsScore.click().then(function () {
            page = new ImmissionsPage(page);
            page.immissionsLabel.getText().then(function (text) {
                expect(String(text)).toBe(ImmisionsAppData.MainLabel);
                page = new LeftMenu(page);
                page.menuOverview.click();
            })
        });
    }, 20000);

    it('Check that user navigates to Shopping page', function () {
        //Navigate to Shopping page
        page = new OverviewPage(page);

        page.shoppingScore.click().then(function () {
            page = new ShoppingPage(page);
            page.shoppingLabel.getText().then(function (text) {
                expect(String(text)).toBe(ShopsAppData.MainLabel);
                page = new LeftMenu(page);
                page.menuOverview.click();
            })
        });
    }, 20000);

    it('Check that user navigates to Shopping page', function () {
        //Navigate to Family page
        page = new OverviewPage(page);

        page.familyScore.click().then(function () {
            page = new FamilyPage(page);
            page.familyLabel.getText().then(function (text) {
                expect(String(text)).toBe(FamilyAppData.MainLabel);
                page = new LeftMenu(page);
                page.menuInput.click();
            })
        });
    }, 20000);

    afterAll(function () {
        page = new InputPage(page);
        page.logout();
        page = new LoginPage();
    });
});