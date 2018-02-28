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
        var building_year,
            living_area, 
            floor_number, 
            numbers_of_rooms, 
            numbers_of_bathrooms, 
            balcony_area, 
            number_of_garages, 
            number_of_parking_spots;

        beforeAll(function () {
            page.typeLogin(users_data[0].UserName);
            page.typePassword(users_data[0].Password);
            page.loginToDash();
        });

        it(data.Case + ' all inputs are displayed correctly on Overview page', function () {
            allure.feature('Overview page');
            page = new InputPage(page);

            //Setting Up text fields
            //Get random values according to JSON ALL PAIR data.
            building_year = page.getRandomInteger(data.BUILDING_YEAR);
            living_area = page.getRandomInteger(data.NET_LIVING_AREA);
            floor_number = page.getRandomInteger(data.FLOOR_NUMBER);
            numbers_of_rooms = page.getRandomInteger(data.NUMBERS_OF_ROOMS);
            numbers_of_bathrooms = page.getRandomInteger(data.NUMBERS_OF_BATHROOMS);
            balcony_area = page.getRandomInteger(data.BALCONY_TERRACE);
            number_of_garages = page.getRandomInteger(data.GARAGE);
            number_of_parking_spots = page.getRandomInteger(data.PARKING_SPACE);

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
            browser.executeScript("arguments[0].scrollIntoView();", page.getValuation.getWebElement()).then(function () {
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
                            var a = text.split(/ |\n/);
                            expect(a[0]).toEqual(building_year);
                        })
                }
            });
        }, 240000);

        it(data.Case + ' check that Living area is displayed', function () {
            switch (living_area) {
                case '':
                    expect(page.overviewLivingArea.isPresent()).toBe(false);
                    break;
                default:
                    page.overviewLivingArea.getText().then(function (text) {
                        var a = text.split(/ |\n/);
                        expect(a[0]).toEqual(living_area);
                    })
            }
        }, 24000);

        it(data.Case + ' check that Floor number is displayed', function () {
            switch (floor_number) {
                case '':
                    expect(page.overviewFloorNumber.isPresent()).toBe(false);
                    break;
                default:
                    page.overviewFloorNumber.getText().then(function (text) {
                        var a = text.split(/ |\n/);
                        if (floor_number != 'E.G.') {
                            expect(a[0]).toEqual(floor_number);
                        } else {
                            expect(a[0]).toEqual('0');
                        }
                    })
            }
        });

        it(data.Case + ' check that Number of rooms is displayed/hidden', function () {
            switch (numbers_of_rooms) {
                case '':
                    expect(page.overviewNumberOfRooms.isPresent()).toBe(false);
                    break;
                default:
                    page.overviewNumberOfRooms.getText().then(function (text) {
                        var a = text.split(/ |\n/);
                        expect(a[0]).toEqual(numbers_of_rooms);
                    })
            }
        });

        it(data.Case + ' check that Number of Bathrooms is displayed/hidden', function () {
            switch (numbers_of_bathrooms) {
                case "":
                    expect(page.overviewNumberOfBathrooms.isPresent()).toBe(false);
                    break;
                default:
                    page.overviewNumberOfBathrooms.getText().then(function (text) {
                        var a = text.split(/ |\n/);
                        expect(a[0]).toEqual(numbers_of_bathrooms);
                    })
            }
        });

        it(data.Case + ' check that Balcony area is displayed/hidden', function () {
            switch (balcony_area) {
                case '':
                    expect(page.overviewBalconyArea.isPresent()).toBe(false);
                    break;
                default:
                    page.overviewBalconyArea.getText().then(function (text) {
                        var a = text.split(/ |\n/);
                        expect(a[0]).toEqual(balcony_area);
                    })
            }
        });

        it(data.Case + ' check that Number of garages is displayed/hidden', function () {
            switch (number_of_garages) {
                case '':
                    expect(page.overviewNumberOfGarages.isPresent()).toBe(false);
                    break;
                default:
                    page.overviewNumberOfGarages.getText().then(function (text) {
                        var a = text.split(/ |\n/);
                        expect(a[0]).toEqual(number_of_garages);
                    })
            }
        });

        it(data.Case + ' check that Number of parking spots is displayed/hidden', function () {
            switch (number_of_parking_spots) {
                case '':
                    expect(page.overviewNumberOfParkingSpots.isPresent()).toBe(false);
                    break;
                default:
                    page.overviewNumberOfParkingSpots.getText().then(function (text) {
                        var a = text.split(/ |\n/);
                        expect(a[0]).toEqual(number_of_parking_spots);
                    })
            }
        });

        it(data.Case + ' check that Lift is displayed/hidden', function () {
            //this is check for Apartments only, Lift for houses isn't counted.
            if (data.LIFT == 1) {
                expect(page.overviewLift.isPresent()).toBe(true);
            }

            page = new LeftMenu(page);
            page.menuInput.click();
        });

        afterAll(function () {
            page = new InputPage(page);
            page.logoutLink.click();
            page = new LoginPage();
        });
    });
});