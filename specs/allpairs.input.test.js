var LoginPage = require('./pages/login.page');
var InputPage = require('./pages/input.page');
var using = require('jasmine-data-provider');
var testdata = require('./test_data/allpairs.input.testdata.js');
var users_data = require('./test_data/users.testdata.js');

using(testdata, function (data) {
    describe(' All-Pairs test for Apartment Input page: ', function () {
        var page = new LoginPage();
        it('user is logged in', function () {
            allure.feature('Login page');
            page.typeLogin(users_data[0].UserName);
            page.typePassword(users_data[0].Password);
            page.loginToDash();
        });

        it(data.Case + ' user lands on Input page', function () {
            allure.feature('Input page');
            page = new InputPage(page);

            //Setting Up text fields
            page.typeAddress(data.ADDRESS);
            page.subType.click();
            page.choosePropertyType(data.SUBTYPE);
            //Choose field and set value from JSON ALL PAIR data.
            page.setValueOfField(page.buildingYear, page.getRandomInteger(data.BUILDING_YEAR));
            page.setValueOfField(page.livingArea, page.getRandomInteger(data.NET_LIVING_AREA));
            page.setValueOfField(page.floorNumber, page.getRandomInteger(data.FLOOR_NUMBER));
            page.setValueOfField(page.numberOfRooms, page.getRandomInteger(data.NUMBERS_OF_ROOMS));
            page.setValueOfField(page.numberOfBathrooms, page.getRandomInteger(data.NUMBERS_OF_BATHROOMS));
            page.setValueOfField(page.balconyArea, page.getRandomInteger(data.BALCONY_TERRACE));
            page.setValueOfField(page.numberOfGarages, page.getRandomInteger(data.GARAGE));
            page.setValueOfField(page.numberOfParkingSpots, page.getRandomInteger(data.PARKING_SPACE));

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
            switch (data.MINERGIE) {
                case ("1"):
                    page.minergyCheckbox.isSelected().then(function (selected) {
                        if (selected == false) {
                            page.lift.click();
                        }
                    });
                    break;
                case ("0"):
                    page.minergyCheckbox.isSelected().then(function (selected) {
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
                if (data.KITCHEN == 1) {
                    page.simpleKitchenQuality.click();
                }
                if (data.KITCHEN == 2) {
                    page.normalKitchenQuality.click();
                }
                if (data.KITCHEN == 3) {
                    page.highKitchenQuality.click();
                }
                if (data.KITCHEN == 4) {
                    page.luxuryKitchenQuality.click();
                }
                if (data.KITCHEN_CONDITION == 1) {
                    page.simpleKitchenCondition.click();
                }
                if (data.KITCHEN_CONDITION == 2) {
                    page.highKitchenCondition.click();
                }
                if (data.KITCHEN_CONDITION == 3) {
                    page.luxuryKitchenCondition.click();
                }
            });

            //Setting up Quality and Condition of Bathroom
            switch (data.BATHROOM) {
                case '1':
                    page.simpleBathroomQuality.click();
                    break;
                case '2':
                    page.normalBathroomQuality.click();
                    break;
                case '3':
                    page.highBathroomQuality.click();
                    break;
                case '4':
                    page.luxuryBathroomQuality.click();
                    break;
                default:
                    break;
            }
            switch (data.BATHROOM_CONDITION) {
                case '1':
                    page.simpleBathroomCondition.click();
                    break;
                case '2':
                    page.highBathroomCondition.click();
                    break;
                case '3':
                    page.luxuryBathroomCondition.click();
                    break;
                default:
                    break;
            }

            //Setting up Quality and Condition of Floor
            switch (data.FLOOR) {
                case '1':
                    page.simpleFloorQuality.click();
                    break;
                case '2':
                    page.normalFloorQuality.click();
                    break;
                case '3':
                    page.highFloorQuality.click();
                    break;
                case '4':
                    page.luxuryFloorQuality.click();
                    break;
                default:
                    break;
            }
            switch (data.FLOOR_CONDITION) {
                case '1':
                    page.simpleFloorCondition.click();
                    break;
                case '2':
                    page.highFloorCondition.click();
                    break;
                case '3':
                    page.luxuryFloorCondition.click();
                    break;
                default:
                    break;
            }

            //Setting up Quality and Condition of Windows
            switch (data.WINDOWS) {
                case '1':
                    page.simpleWindowsQuality.click();
                    break;
                case '2':
                    page.normalWindowsQuality.click();
                    break;
                case '3':
                    page.highWindowsQuality.click();
                    break;
                case '4':
                    page.luxuryWindowsQuality.click();
                    break;
                default:
                    break;
            }
            switch (data.WINDOWS_CONDITION) {
                case '1':
                    page.simpleWindowsCondition.click();
                    break;
                case '2':
                    page.highWindowsCondition.click();
                    break;
                case '3':
                    page.luxuryWindowsCondition.click();
                    break;
                default:
                    break;
            }

            //Check if button is enabled
            if (data.EXPECTED_RESULT == 'False') {
                expect(page.getValuation.isEnabled()).toBe(false);
            } else if (data.EXPECTED_RESULT == 'True') {
                expect(page.getValuation.isEnabled()).toBe(true);
            }
        });
        
        it('user is logged out', function () {
            allure.feature('Login page');
            page.logout();
            page = new LoginPage();
        });
    });
});

