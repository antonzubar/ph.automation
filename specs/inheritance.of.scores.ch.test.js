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

    beforeEach(function () {
        page.typeLogin(users_data[0].UserName);
        page.typePassword(users_data[0].Password);
        page.loginToDash();
    });

    it(' User navigates through Scores pages', function () {
        allure.feature('Input page');
        page = new InputPage(page);

        page.setValueOfField(page.buildingYear, page.getRandomInteger("1850~2018"));
        page.setValueOfField(page.livingArea, page.getRandomInteger("1~500"));
        page.setValueOfField(page.floorNumber, page.getRandomInteger("0~20"));
        page.setValueOfField(page.numberOfRooms, page.getRandomInteger(""));

        //Scroll down and verify that initial values are 0.
        browser.executeScript('window.scrollTo(100000, 100000);').then(function () {
            page.editScores.click();
            page.saveQCL.click();
        });
        page.getValuation.click().then(function () {
            page = new OverviewPage(page);

            //Navigate to Noise page
            //variable for values of Scores
            var noiseScoreValue, viewScoreValue, immisionsScoreValue, shoppingScoreValue, familyScoreValue;

            page.noiseScore.getText().then(function (text) {
                noiseScoreValue = text;
            });
            page.noiseScore.click().then(function () {
                page = new NoisePage;
                page.quietScore.getText().then(function (text) {
                    expect(String(text)).toBe(String(noiseScoreValue));
                    console.log(String(text) + "= " + noiseScoreValue); //delete logs
                    page = new LeftMenu(page);
                    page.menuItems.get(1).click();
                })
            });

            //Navigate to View page
            page = new OverviewPage(page);

            page.viewScore.getText().then(function (text) {
                viewScoreValue = text;
            });
            page.viewScore.click().then(function () {
                page = new ViewPage(page);
                page.viewScore.getText().then(function (text) {
                    expect(String(text)).toBe(String(viewScoreValue));
                    console.log(String(text) + "= " + viewScoreValue); //delete logs
                    page = new LeftMenu(page);
                    page.menuItems.get(1).click();
                })
            });

            //Navigate to Immissions page
            page = new OverviewPage(page);

            page.immisionsScore.getText().then(function (text) {
                immisionsScoreValue = text;
            });
            page.immisionsScore.click().then(function () {
                page = new ImmissionsPage(page);
                page.immissionsScore.getText().then(function (text) {
                    expect(String(text)).toBe(String(immisionsScoreValue));
                    console.log(String(text) + "= " + immisionsScoreValue); //delete logs
                    page = new LeftMenu(page);
                    page.menuItems.get(1).click();
                })
            });

            //Navigate to Shopping page
            page = new OverviewPage(page);

            page.shoppingScore.getText().then(function (text) {
                shoppingScoreValue = text;
            });
            page.shoppingScore.click().then(function () {
                page = new ShoppingPage(page);
                page.shoppingScore.getText().then(function (text) {
                    expect(String(text)).toBe(String(shoppingScoreValue));
                    console.log(String(text) + "= " + shoppingScoreValue); //delete logs
                    page = new LeftMenu(page);
                    page.menuItems.get(1).click();
                })
            });

            //Navigate to Family page
            page = new OverviewPage(page);

            page.familyScore.getText().then(function (text) {
                familyScoreValue = text;
            });
            page.familyScore.click().then(function () {
                page = new FamilyPage(page);
                page.familyScore.getText().then(function (text) {
                    expect(String(text)).toBe(String(familyScoreValue));
                    console.log(String(text) + "= " + familyScoreValue); //delete logs
                    page = new LeftMenu(page);
                    page.menuItems.get(0).click();
                    page = new InputPage(page);
                })
            });
        });
    }, 240000);

    afterEach(function () {
        page.logout();
        page = new LoginPage();
    });
});