var LoginPage = require('./pages/login.page');
var LeftMenu = require('./pages/left.menu.page');
var InputPage = require('./pages/input.page');
var users_data = require('./test_data/users.testdata.js');
var OverviewPage = require('./pages/overview.page');
var MarketPage = require('./pages/market.page');
var MarketAppData = require('./app_data/market.appdata.json');
var MinDataForValuation = require('./app_data/min.data.for.valuation.appdata.json');

describe('Navigating from Overvieiw to Market page: ', function () {
    var page = new LoginPage();

    beforeEach(function () {
        page.typeLogin(users_data[0].UserName);
        page.typePassword(users_data[0].Password);
        page.loginToDash();
    });

    it(' User clicks on Go Explore button under Market widget', function () {
        allure.feature('Input page');
        page = new InputPage(page);

        page.setValueOfField(page.buildingYear, page.getRandomInteger(MinDataForValuation.BUILDING_YEAR));
        page.setValueOfField(page.livingArea, page.getRandomInteger(MinDataForValuation.NET_LIVING_AREA));
        page.setValueOfField(page.floorNumber, page.getRandomInteger(MinDataForValuation.FLOOR_NUMBER));
        page.setValueOfField(page.numberOfRooms, page.getRandomInteger(MinDataForValuation.NUMBERS_OF_ROOMS));

        //Scroll down and verify that initial values are 0.
        browser.executeScript("arguments[0].scrollIntoView();", page.getValuation.getWebElement()).then(function () {
            page.clickButton(page.getValuation)
        }).then(function () {
            page = new OverviewPage(page);

            //Navigate to Noise page
            page.marketGoExplore.click().then(function () {
                page = new MarketPage(page);
                page.marketLabel.getText().then(function (text) {
                    expect(String(text)).toBe(MarketAppData.MainLabel);
                    page = new LeftMenu(page);
                    page.menuOverview.click();
                    page = new InputPage(page);
                })
            });
        });
    }, 240000);

    afterEach(function () {
        page = new InputPage(page);
        page.logout();
        page = new LoginPage();
    });
});
