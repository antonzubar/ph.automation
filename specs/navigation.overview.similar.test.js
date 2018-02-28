var LoginPage = require('./pages/login.page');
var LeftMenu = require('./pages/left.menu.page');
var InputPage = require('./pages/input.page');
var users_data = require('./test_data/users.testdata.js');
var OverviewPage = require('./pages/overview.page');
var SimilarOffersPage = require('./pages/similar.offers.page');
var SimilarOffersAppData = require('./app_data/similar.offers.appdata.json');
var AddressWithSimilar = require('./app_data/address.with.similar.offers.appdata.json');

describe('Navigating from Overvieiw to Similar page: ', function () {
    var page = new LoginPage();

    beforeAll(function () {
        page.typeLogin(users_data[0].UserName);
        page.typePassword(users_data[0].Password);
        page.loginToDash();
    });

    it(' User clicks Active button in Offers widget', function () {
        allure.feature('Input page');
        page = new InputPage(page);

        page.typeAddress(AddressWithSimilar.ADDRESS);
        page.setValueOfField(page.buildingYear, page.getRandomInteger(AddressWithSimilar.BUILDING_YEAR));
        page.setValueOfField(page.livingArea, page.getRandomInteger(AddressWithSimilar.NET_LIVING_AREA));
        page.setValueOfField(page.floorNumber, page.getRandomInteger(AddressWithSimilar.FLOOR_NUMBER));
        page.setValueOfField(page.numberOfRooms, page.getRandomInteger(AddressWithSimilar.NUMBERS_OF_ROOMS));

        //Scroll down and verify that initial values are 0.
        browser.executeScript("arguments[0].scrollIntoView();", page.getValuation.getWebElement()).then(function () {
            page.clickButton(page.getValuation)
        }).then(function () {
            page = new OverviewPage(page);

            //Navigate to Active Offers
            page.activeOffersInAreaButton.click().then(function () {
                page = new SimilarOffersPage(page);
                page.similarOffersLabel.getText().then(function (text) {
                    expect(String(text)).toBe(SimilarOffersAppData.MainLabel);
                    page = new LeftMenu(page);
                    page.menuOverview.click();
                })
            });
        });
    }, 240000);

    it('User clicks Historic button in Offers widget', function () {
        //Navigate to Historical Offers
        page = new OverviewPage(page);
        
        page.historicOffersInAreaButton.click().then(function () {
            page = new SimilarOffersPage(page);
            page.similarOffersLabel.getText().then(function (text) {
                expect(String(text)).toBe(SimilarOffersAppData.MainLabel);
                page = new LeftMenu(page);
                page.menuOverview.click();
            })
        });
    }, 10000);

    it('Navigation to Similar offers', function () {
        page = new OverviewPage(page);
        
        //Navigate to Similar Offers page
        page.similarGoExplore.click().then(function () {
            page = new SimilarOffersPage(page);
            page.similarOffersLabel.getText().then(function (text) {
                expect(String(text)).toBe(SimilarOffersAppData.MainLabel);
                page = new LeftMenu(page);
                page.menuOverview.click();
                page = new InputPage(page);
            })
        }, 10000);
    });

    afterAll(function () {
        page = new InputPage(page);
        page.logout();
        page = new LoginPage();
    });
});

