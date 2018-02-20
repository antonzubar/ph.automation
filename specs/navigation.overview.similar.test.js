var LoginPage = require('./pages/login.page');
var LeftMenu = require('./pages/left.menu.page');
var InputPage = require('./pages/input.page');
var users_data = require('./test_data/users.testdata.js');
var OverviewPage = require('./pages/overview.page');
var SimilarOffersPage = require('./pages/similar.offers.page');

describe('Navigating from Overvieiw to Similar page: ', function () {
    var page = new LoginPage();

    beforeEach(function () {
        page.typeLogin(users_data[0].UserName);
        page.typePassword(users_data[0].Password);
        page.loginToDash();
    });

    it(' User clicks on all buttons under Offers area', function () {
        allure.feature('Input page');
        page = new InputPage(page);

        page.typeAddress("Hardgutstrasse 22, 8048 Zürich, Switzerland");
        page.setValueOfField(page.buildingYear, page.getRandomInteger("1990"));
        page.setValueOfField(page.livingArea, page.getRandomInteger("60"));
        page.setValueOfField(page.floorNumber, page.getRandomInteger("5"));
        page.setValueOfField(page.numberOfRooms, page.getRandomInteger(""));

        //Scroll down and verify that initial values are 0.
        browser.executeScript('window.scrollTo(100000, 100000);').then(function () {
            page.editScores.click();
            page.saveQCL.click();
        });
        page.getValuation.click().then(function () {
            page = new OverviewPage(page);

            //Navigate to Active Offers
            page.offersInArea.get(0).click().then(function () {
                page = new SimilarOffersPage(page);
                page.similarOffersLabel.getText().then(function (text) {
                    expect(String(text)).toBe('Ähnliche Angebote');
                    page = new LeftMenu(page);
                    page.menuItems.get(1).click();
                })
            });

            //Navigate to Historical Offers
            page.offersInArea.get(1).click().then(function () {
                page = new SimilarOffersPage(page);
                page.similarOffersLabel.getText().then(function (text) {
                    expect(String(text)).toBe('Ähnliche Angebote');
                    page = new LeftMenu(page);
                    page.menuItems.get(1).click();
                })
            });

            //Navigate to Similar Offers page
            page.similarGoExplore.click().then(function () {
                page = new SimilarOffersPage(page);
                page.similarOffersLabel.getText().then(function (text) {
                    expect(String(text)).toBe('Ähnliche Angebote');
                    page = new LeftMenu(page);
                    page.menuItems.get(1).click();
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

