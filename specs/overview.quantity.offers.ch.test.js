var LoginPage = require('./pages/login.page');
var LeftMenu = require('./pages/left.menu.page');
var InputPage = require('./pages/input.page');
var users_data = require('./test_data/users.testdata.js');
var OverviewPage = require('./pages/overview.page');
var SimilarOffersPage = require('./pages/similar.offers.page');

describe(' Comparing offers quantity between Overview and Similar Offers pages', function () {
    var page = new LoginPage();
    var EC = protractor.ExpectedConditions;

    beforeAll(function () {
        page.typeLogin(users_data[0].UserName);
        page.typePassword(users_data[0].Password);
        page.loginToDash();
    });

    it(' User clicks on Active Offers and compare value between Overview and Offers', function () {
        allure.feature('Input page');
        page = new InputPage(page);

        page.typeAddress("Pfingstweidstrasse 51, 8005 Zürich, Switzerland");
        page.setValueOfField(page.buildingYear, page.getRandomInteger("1990"));
        page.setValueOfField(page.livingArea, page.getRandomInteger("60"));
        page.setValueOfField(page.floorNumber, page.getRandomInteger("5"));
        page.setValueOfField(page.numberOfRooms, page.getRandomInteger(""));

        //Scroll down and verify that initial values are 0.
        browser.executeScript('window.scrollTo(100000, 100000);').then(function () {
            page.clickButton(page.getValuation)
        }).then(function () {
            page = new OverviewPage(page);

            //Navigate to Active Offers
            var quantityOfActiveOffers;
            page.offersQuantityInArea.get(0).getText().then(function (text) {
                quantityOfActiveOffers = text;
            });
            page.offersInArea.get(0).click().then(function () {
                page = new SimilarOffersPage(page);
                page.similarOffersLabel.getText().then(function (text) {
                    page.similarCard.count().then(function (size) {
                        var object;
                        if (size == 1) {
                            object = " Objekt)"
                        } else {
                            object = " Objekte)"
                        }
                        expect(String(quantityOfActiveOffers)).toBe("(" + size + object);
                    });
                })
            });

        });
    }, 240000);

    it(' User clicks on Historical Offers and compare value between Overview and Offers', function () {

        page = new LeftMenu(page);
        page.menuItems.get(1).click();
        page = new OverviewPage(page);

        //Navigate to Historical Offers
        var quantityOfHistoricalOffers;
        page.offersQuantityInArea.get(1).getText().then(function (text) {
            quantityOfHistoricalOffers = text;
        });
        page.offersInArea.get(1).click().then(function () {
            page = new SimilarOffersPage(page);
            page.similarOffersLabel.getText().then(function (text) {
                page.similarCard.count().then(function (size) {
                    var object;
                    if (size == 1) {
                        object = " Objekt)"
                    } else {
                        object = " Objekte)"
                    }
                    expect(String(quantityOfHistoricalOffers)).toBe("(" + size + object);
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


