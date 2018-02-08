var LoginPage = require('./pages/login.page');
var InputPage = require('./pages/input.page');
var OverviewPage = require('./pages/overview.page');
var LeftMenu = require('./pages/left.menu.page');
var using = require('jasmine-data-provider');
var testdata = require('./test_data/overview.ch.inheritance.testdata.js');
var users_data = require('./test_data/users.testdata.js');

using(testdata, function (data) {
    describe(' Inheritanse test for Apartment Input page: ', function () {
        var page = new LoginPage();
        it('user is logged in', function () {
            allure.feature('Login page');
            page.typeLogin(users_data[0].UserName);
            page.typePassword(users_data[0].Password);
            page.loginToDash();
        });

        it(data.Case + ' all inputs are displayed correctly on Overview page', function () {
            allure.feature('Overview page');
            page = new InputPage(page);

            //Setting Up text fields
            //Get random values according to JSON ALL PAIR data.
            var building_year = page.getRandomInteger(data.BUILDING_YEAR);
            var living_area = page.getRandomInteger(data.NET_LIVING_AREA);
            var floor_number = page.getRandomInteger(data.FLOOR_NUMBER);
            var numbers_of_rooms = page.getRandomInteger(data.NUMBERS_OF_ROOMS);
            var numbers_of_bathrooms = page.getRandomInteger(data.NUMBERS_OF_BATHROOMS);
            var balcony_area = page.getRandomInteger(data.BALCONY_TERRACE);
            var number_of_garages = page.getRandomInteger(data.GARAGE);
            var number_of_parking_spots = page.getRandomInteger(data.PARKING_SPACE);

            //Choose field and set value from JSON ALL PAIR data.
            page.setValueOfField(page.buildingYear, building_year);
            page.setValueOfField(page.livingArea, living_area);
            page.setValueOfField(page.floorNumber, floor_number);
            page.setValueOfField(page.numberOfRooms, numbers_of_rooms);
            page.setValueOfField(page.numberOfBathrooms, numbers_of_bathrooms);
            page.setValueOfField(page.balconyArea, balcony_area);
            page.setValueOfField(page.numberOfGarages, number_of_garages);
            page.setValueOfField(page.numberOfParkingSpots, number_of_parking_spots);

            //Setting up additional parameters (lift etc)
            switch (data.LIFT) {
                case ("1"):
                    page.liftCheckbox.isSelected().then(function (selected) {
                        if (selected == false) {
                            page.lift.click();
                        }
                    });
                    break;
                case ("0"):
                    page.liftCheckbox.isSelected().then(function (selected) {
                        if (selected == true) {
                            page.lift.click();
                        }
                    });
                    break;
                default:
                    break;
            }

            //Scrolling down to Quality and Condition
            //Setting up Quality and Condition of Kitchen
            browser.executeScript('window.scrollTo(1300, 900);').then(function () {
                page.getValuation.click();
            }).then(function () {
                //Going to Overview page
                page = new OverviewPage(page);
                //Comparing data on Input and Overview
                switch (building_year) {
                    case '':
                        expect(page.overviewBuildingYear.isPresent()).toBe(false);
                        break;
                    default:
                        page.overviewBuildingYear.getText().then(function (text) {
                            expect(page.overviewBuildingYear.isDisplayed()).toBe(true);
                            var a = text.split(/ |\n/);
                            expect(a[0]).toEqual(building_year);
                        })
                }
                switch (living_area) {
                    case '':
                        expect(page.overviewLivingArea.isPresent()).toBe(false);
                        break;
                    default:
                        page.overviewLivingArea.getText().then(function (text) {
                            expect(page.overviewLivingArea.isDisplayed()).toBe(true);
                            var a = text.split(/ |\n/);
                            expect(a[0]).toEqual(living_area);
                        })
                }
                switch (floor_number) {
                    case '':
                        expect(page.overviewFloorNumber.isPresent()).toBe(false);
                        break;
                    default:
                        page.overviewFloorNumber.getText().then(function (text) {
                            expect(page.overviewFloorNumber.isDisplayed()).toBe(true);
                            var a = text.split(/ |\n/);
                            if (floor_number != 'E.G.') {
                                expect(a[0]).toEqual(floor_number);
                            } else {
                                expect(a[0]).toEqual('0');
                            }
                        })
                }
                switch (numbers_of_rooms) {
                    case '':
                        expect(page.overviewNumberOfRooms.isPresent()).toBe(false);
                        break;
                    default:
                        page.overviewNumberOfRooms.getText().then(function (text) {
                            expect(page.overviewNumberOfRooms.isDisplayed()).toBe(true);
                            var a = text.split(/ |\n/);
                            expect(a[0]).toEqual(numbers_of_rooms);
                        })
                }
                switch (numbers_of_bathrooms) {
                    case "":
                        expect(page.overviewNumberOfBathrooms.isPresent()).toBe(false);
                        break;
                    default:
                        page.overviewNumberOfBathrooms.getText().then(function (text) {
                            expect(page.overviewNumberOfBathrooms.isDisplayed()).toBe(true);
                            var a = text.split(/ |\n/);
                            expect(a[0]).toEqual(numbers_of_bathrooms);
                        })
                }
                switch (balcony_area) {
                    case '':
                        expect(page.overviewBalconyArea.isPresent()).toBe(false);
                        break;
                    default:
                        page.overviewBalconyArea.getText().then(function (text) {
                            expect(page.overviewBalconyArea.isDisplayed()).toBe(true);
                            var a = text.split(/ |\n/);
                            expect(a[0]).toEqual(balcony_area);
                        })
                }
                switch (number_of_garages) {
                    case '':
                        expect(page.overviewNumberOfGarages.isPresent()).toBe(false);
                        break;
                    default:
                        page.overviewNumberOfGarages.getText().then(function (text) {
                            expect(page.overviewNumberOfGarages.isDisplayed()).toBe(true);
                            var a = text.split(/ |\n/);
                            expect(a[0]).toEqual(number_of_garages);
                        })
                }
                switch (number_of_parking_spots) {
                    case '':
                        expect(page.overviewNumberOfParkingSpots.isPresent()).toBe(false);
                        break;
                    default:
                        page.overviewNumberOfParkingSpots.getText().then(function (text) {
                            expect(page.overviewNumberOfParkingSpots.isDisplayed()).toBe(true);
                            var a = text.split(/ |\n/);
                            expect(a[0]).toEqual(number_of_parking_spots);
                        })
                }
            }).then(function () {
                //this is check for Apartments only, Lift for houses isn't counted.
                if (data.LIFT == 1) {
                    expect(page.overviewLift.isPresent()).toBe(true);
                }
            });

            it('user is returned to Input page', function () {
                allure.feature('Navigation with Left Menu');
                page = new LeftMenu(page);
                page.menuItems.get(0).click();
            });
        }, 240000);
        it('user is logged out', function () {
            page = new InputPage(page);
            allure.feature('Login/Logout feature');
            page.logoutLink.click();
            page = new LoginPage();
        });
    });
});