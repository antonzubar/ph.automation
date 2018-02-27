var LoginPage = require('./pages/login.page');
var InputPage = require('./pages/input.page');
var OverviewPage = require('./pages/overview.page');
var LeftMenu = require('./pages/left.menu.page');
var using = require('jasmine-data-provider');
var testdata = require('./test_data/ch.overview.scores.testdata.js');
var users_data = require('./test_data/users.testdata.js');

using(testdata, function (data) {
    describe(' Scores for overview: ', function () {
        var page = new LoginPage();

        beforeAll(function () {
            page.typeLogin(users_data[0].UserName);
            page.typePassword(users_data[0].Password);
            page.loginToDash();
        });

        it(data.Case + ' user checks that Noise has sane value', function () {
            allure.feature('Overview page');
            page = new InputPage(page);

            //Setting Up text fields
            page.typeAddress(data.ADDRESS);
            page.subType.click();
            page.choosePropertyType(data.SUBTYPE);

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

            //Setting up additional parameters (lift, minergie etc)
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
            browser.executeScript("arguments[0].scrollIntoView();", page.getValuation.getWebElement()).then(function () {
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
            }).then(function () {
                page.editScores.click();
                page.saveQCL.click();
            });

            page.getValuation.click().then(function () {
                //Going to Overview page
                page = new OverviewPage(page);

                page.noiseScore.getText().then(function (text) {
                    noiseScoreNumber = Number(text);
                    browser.waitForAngular();
                    if (1 < noiseScoreNumber && noiseScoreNumber <= 5) {
                        expect('Test is passed').toBe('Test is passed');
                    } else {
                        expect('Test is passed').toBe('Failed');
                    }
                });
            });
        }, 240000);

        //Checking View page
        it(data.Case + 'Check View score has sane value', function () {
            page.viewScore.getText().then(function (text) {
                viewScoreNumber = Number(text);
                if (1 < viewScoreNumber && viewScoreNumber <= 5) {
                    expect('Test is passed').toBe('Test is passed');
                } else {
                    expect('Test is passed').toBe('Failed');
                }
            });
        });

        //Checking Immisions page
        it(data.Case + 'Check Immisions score has sane value', function () {
            page.immisionsScore.getText().then(function (text) {
                immisionsScoreNumber = Number(text);
                if (1 < immisionsScoreNumber && immisionsScoreNumber <= 5) {
                    expect('Test is passed').toBe('Test is passed');
                } else {
                    expect('Test is passed').toBe('Failed');
                }
            });
        });

        //Checking Shopping score
        it(data.Case + 'Check Shopping score has sane value', function () {
            page.shoppingScore.getText().then(function (text) {
                shoppingScoreNumber = Number(text);
                if (1 <= shoppingScoreNumber && shoppingScoreNumber <= 5) {
                    expect('Test is passed').toBe('Test is passed');
                } else {
                    expect('Test is passed').toBe('Failed');
                }
            });
        });

        //Checking Family score
        it(data.Case + 'Check Family score has sane value', function () {
            page.familyScore.getText().then(function (text) {
                familyScoreNumber = Number(text);
                if (1 < familyScoreNumber && familyScoreNumber <= 5) {
                    expect('Test is passed').toBe('Test is passed');
                } else {
                    expect('Test is passed').toBe('Failed');
                }
            }).then(function () {
                page = new LeftMenu(page);
                page.menuItems.get(0).click();
            });
        });

        afterAll(function () {
            page = new InputPage(page);
            page.logout();
            page = new LoginPage();
        });
    });
});