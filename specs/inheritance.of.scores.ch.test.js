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

describe('Navigation from Overview to Score pages: ', function () {
    var page = new LoginPage();
    var noiseScoreValue, viewScoreValue, immisionsScoreValue, shoppingScoreValue, familyScoreValue;

    beforeAll(function () {
        page.typeLogin(users_data[0].UserName);
        page.typePassword(users_data[0].Password);
        page.loginToDash();
    });

    it(' User Navigates to Noise page', function () {
        allure.feature('Input page');
        page = new InputPage(page);

        page.setValueOfField(page.buildingYear, page.getRandomInteger("1850~2018"));
        page.setValueOfField(page.livingArea, page.getRandomInteger("1~500"));
        page.setValueOfField(page.floorNumber, page.getRandomInteger("0~20"));
        page.setValueOfField(page.numberOfRooms, page.getRandomInteger(""));

        //Scroll down and verify that initial values are 0.
        browser.executeScript('window.scrollTo(100000, 100000);').then(function () {
            page.clickButton(page.getValuation)
        }).then(function () {
            page = new OverviewPage(page);

            page.waitElement(page.similarGoExplore);
            page.noiseScore.getText().then(function (text) {
                noiseScoreValue = text;
            });

            page.viewScore.getText().then(function (text) {
                viewScoreValue = text;
            });

            page.immisionsScore.getText().then(function (text) {
                immisionsScoreValue = text;
            });

            page.shoppingScore.getText().then(function (text) {
                shoppingScoreValue = text;
            });

            page.familyScore.getText().then(function (text) {
                familyScoreValue = text;
            });

            //Navigate to Noise page
            //variable for values of Scores
            page.noiseScore.click().then(function () {
                page = new NoisePage;

                //Wait for Score and comparing with initial value
                page.waitForScore(page.quietScore, String(noiseScoreValue));
                page.quietScore.getText().then(function (text) {
                    expect(Number(text)).toBe(Number(noiseScoreValue));
                })
            });
        });
    }, 240000);

    it('Navigate to View page', function () {
        //Get back to Overview
        page = new LeftMenu(page);
        page.menuItems.get(1).click();

        //Navigate to View page
        page = new OverviewPage(page);
        page.viewScore.click().then(function () {
            page = new ViewPage(page);

            //Wait for Score and comparing with initial value
            page.waitForScore(page.viewScore, String(viewScoreValue));
            page.viewScore.getText().then(function (text) {
                expect(Number(text)).toBe(Number(viewScoreValue));
            })
        });
    }, 240000);

    it('Navigate to Immisions page', function () {
        //Navigate to Overview page
        page = new LeftMenu(page);
        page.menuItems.get(1).click();

        //Navigate to Immissions page
        page = new OverviewPage(page);
        page.immisionsScore.click().then(function () {
            page = new ImmissionsPage(page);

            //Wait for Score and comparing with initial value
            page.waitForScore(page.immissionsScore, String(immisionsScoreValue));
            page.immissionsScore.getText().then(function (text) {
                expect(Number(text)).toBe(Number(immisionsScoreValue));
            })
        });
    }, 240000);

    it('Navigate to Shopping page', function () {
        //Navigate to Overview page
        page = new LeftMenu(page);
        page.menuItems.get(1).click();

        //Navigate to Shopping page
        page = new OverviewPage(page);
        page.shoppingScore.click().then(function () {
            page = new ShoppingPage(page);

            //Wait for Score and comparing with initial value
            page.waitForScore(page.shoppingScore, String(shoppingScoreValue));
            page.shoppingScore.getText().then(function (text) {
                expect(Number(text)).toBe(Number(shoppingScoreValue));
            })
        });
    }, 240000);

    it('Navigate to Family page', function () {
        //Navigate to Overview page
        page = new LeftMenu(page);
        page.menuItems.get(1).click();

        //Navigate to Family page
        page = new OverviewPage(page);
        page.familyScore.click().then(function () {
            page = new FamilyPage(page);

            //Wait for Score and comparing with initial value
            page.waitForScore(page.familyScore, String(familyScoreValue));
            page.familyScore.getText().then(function (text) {
                expect(Number(text)).toBe(Number(familyScoreValue));
            })
        });
    }, 240000);

    afterAll(function () {
        page = new InputPage(page);
        page.logout();
        page = new LoginPage();
    });
});