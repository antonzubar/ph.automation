var LoginPage = require('./pages/login.page');
var LeftMenu = require('./pages/left.menu.page');
var InputPage = require('./pages/input.page');
var users_data = require('./test_data/users.testdata.js');
var OverviewPage = require('./pages/overview.page');
var MarketPage = require('./pages/market.page');

describe('Navigating from Overvieiw to Market page: ', function () {
    var page = new LoginPage();
    it('user is logged in', function () {
        allure.feature('Login page');
        page.typeLogin(users_data[0].UserName);
        page.typePassword(users_data[0].Password);
        page.loginToDash();
    });

    it(' User clicks on Go Explore button under Market widget', function () {
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
            page.marketGoExplore.click().then(function () {
                page = new MarketPage(page);
                page.marketLabel.getText().then(function (text) {
                    expect(String(text)).toBe('Markt');
                    page = new LeftMenu(page);
                    page.menuItems.get(1).click();
                    page = new InputPage(page);
                })
            });
        });
    }, 240000);

    it('user is logged out', function () {
        allure.feature('Login/Logout feature');
        page = new InputPage(page);
        page.logout();
        page = new LoginPage();
    });
});
