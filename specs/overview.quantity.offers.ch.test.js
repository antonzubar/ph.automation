var LoginPage = require('./pages/login.page');
var LeftMenu = require('./pages/left.menu.page');
var InputPage = require('./pages/input.page');
var users_data = require('./test_data/users.testdata.js');
var OverviewPage = require('./pages/overview.page');
var SimilarOffersPage = require('./pages/similar.offers.page');
var AddressWithSimilar = require('./app_data/address.with.similar.offers.appdata.json');

describe(' Comparing offers quantity between Overview and Similar Offers pages', function () {
    var page = new LoginPage();

    beforeAll(function () {
        page.typeLogin(users_data[0].UserName);
        page.typePassword(users_data[0].Password);
        page.loginToDash();
    });

    it(' User clicks on Active Offers and compare value between Overview and Offers', function () {
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
            var quantityOfActiveOffers;
            page.activeOffersInArea.getText().then(function (text) {
                //Leave only digitals from string
                quantityOfActiveOffers = String(text).replace(/\D/g,'');
            });
            page.activeOffersInAreaButton.click().then(function () {
                page = new SimilarOffersPage(page);
                page.similarOffersLabel.getText().then(function (text) {
                    page.similarCard.count().then(function (size) {
                        expect(+quantityOfActiveOffers).toBe(size);
                    });
                })
            });

        });
    }, 240000);

    it(' User clicks on Historical Offers and compare value between Overview and Offers', function () {

        page = new LeftMenu(page);
        page.menuOverview.click();
        page = new OverviewPage(page);

        //Navigate to Historical Offers
        var quantityOfHistoricalOffers;
        page.historicOffersInArea.getText().then(function (text) {
            //Leave only digitals from string
            quantityOfHistoricalOffers = String(text).replace(/\D/g,'');
        });
        page.historicOffersInAreaButton.click().then(function () {
            page = new SimilarOffersPage(page);
            page.similarOffersLabel.getText().then(function (text) {
                page.similarCard.count().then(function (size) {
                    expect(+quantityOfHistoricalOffers).toBe(size);
                });
            })
        }, 20000);
    });

    afterAll(function () {
        page = new InputPage(page);
        page.logout();
        page = new LoginPage();
    });
});


