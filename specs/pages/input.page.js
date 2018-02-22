'use strict';

var InputPage = function () {
};
var EC = protractor.ExpectedConditions;

 InputPage.prototype = Object.create({}, {
    //---------------------------Info Pane objects-------------------------------------------------
     outOfForms: { get: function () { return element(by.className('ng-isolate-scope')); }},

    //Address elements
     address: { get: function () { return element(by.id('address')); }},
     typeAddress: { value: function (keys) { return this.address.clear().sendKeys(keys, protractor.Key.TAB); }},

    //Types of properties
     apartmentType: { value: function () { return element(by.id('apartmentType'))}},
     houseType: { value: function () { return element(by.id('houseType'))}},

    //Input elements
     subType: { get: function () { return element(by.model('$ctrl.userInput.propertyType.subcode')); }},
     subTypesList: { get: function () { return element.all(by.repeater('subType in $ctrl.formOptions.subTypes')); }},
     choosePropertyType: { value: function (number) { return this.subTypesList.get(number).sendKeys(protractor.Key.ENTER); }},
     buildingYear: { get: function () { return element(by.name('buildingYear')); }},
     livingArea: { get: function () { return element(by.name('livingArea')); }},
     landArea: { get: function () { return element(by.name('landArea')); }},
     volume: { get: function () { return element(by.name('volume')); }},
     floorNumber: { get: function () { return element(by.name('floorNumber')); }},
     numberOfRooms: { get: function () { return element(by.name('numberOfRooms')); }},
     numberOfBathrooms: { get: function () { return element(by.name('numberOfBathrooms')); }},
     balconyArea: { get: function () { return element(by.name('balconyArea')); }},
     numberOfGarages: { get: function () { return element(by.name('numberOfGarages')); }},
     numberOfParkingSpots: { get: function () { return element(by.name('numberOfParkingSpots')); }},
     //Get random value in range
     getRandomInteger: { value: function (value) {
            var min, max;
            var arrayMinMax = value.split('~');
            if (arrayMinMax.length == 1){
                return arrayMinMax[0].toString();
            }
            min = arrayMinMax[0];
            max = arrayMinMax[1];
            var rand = min - 0.5 + Math.random() * (max - min + 1);
            rand = Math.round(rand);
            return rand.toString();
        }
     },
     //Set provided value for choosen web element
     setValueOfField: { value: function (field, value) {
         if (value != ""){return field.clear().sendKeys(value, protractor.Key.TAB);} else { return field.clear().sendKeys(protractor.Key.ESCAPE)}}},


    //Additional elements
     lift: { get: function () { return element(by.css('label[for="lift"]'))}},
     liftCheckbox: { get: function () { return element(by.id('lift'))}},
     minenergy: { get: function () { return element(by.css('label[for="energy"]'))}},
     minergyCheckbox: { get: function () { return element(by.id('energy'))}},
     pool: { get: function () { return element(by.id('pool'))}},
     poolCheckbox: { get: function () { return element(by.id('pool'))}},

     //Quality and Condition of Kitchen
     simpleKitchenQuality: { get: function () { return element(by.css('label[for="kitchenQualitySimple"]')); }},
     normalKitchenQuality: { get: function () { return element(by.css('label[for="kitchenQualityNormal"]')); }},
     highKitchenQuality: { get: function () { return element(by.css('label[for="kitchenQualityHigh"]')); }},
     luxuryKitchenQuality: { get: function () { return element(by.css('label[for="kitchenQualityLuxury"]')); }},

     simpleKitchenCondition: { get: function () { return element(by.css('label[for="kitchenConditionLuxury"]')); }},
     highKitchenCondition: { get: function () { return element(by.css('label[for="kitchenConditionHigh"]')); }},
     luxuryKitchenCondition: { get: function () { return element(by.css('label[for="kitchenConditionSimple"]')); }},

     //Quality and Condition of Bathroom
     simpleBathroomQuality: { get: function () { return element(by.css('label[for="bathroomQualitySimple"]')); }},
     normalBathroomQuality: { get: function () { return element(by.css('label[for="bathroomQualityNormal"]')); }},
     highBathroomQuality: { get: function () { return element(by.css('label[for="bathroomQualityHigh"]')); }},
     luxuryBathroomQuality: { get: function () { return element(by.css('label[for="bathroomQualityLuxury"]')); }},

     simpleBathroomCondition: { get: function () { return element(by.css('label[for="bathroomConditionLuxury"]')); }},
     highBathroomCondition: { get: function () { return element(by.css('label[for="bathroomConditionHigh"]')); }},
     luxuryBathroomCondition: { get: function () { return element(by.css('label[for="bathroomConditionSimple"]')); }},

     //Quality and Condition of Floor
     simpleFloorQuality: { get: function () { return element(by.css('label[for="floorQualitySimple"]')); }},
     normalFloorQuality: { get: function () { return element(by.css('label[for="floorQualityNormal"]')); }},
     highFloorQuality: { get: function () { return element(by.css('label[for="floorQualityHigh"]')); }},
     luxuryFloorQuality: { get: function () { return element(by.css('label[for="floorQualityLuxury"]')); }},

     simpleFloorCondition: { get: function () { return element(by.css('label[for="floorConditionLuxury"]')); }},
     highFloorCondition: { get: function () { return element(by.css('label[for="floorConditionHigh"]')); }},
     luxuryFloorCondition: { get: function () { return element(by.css('label[for="floorConditionSimple"]')); }},

     //Quality and Condition of Windows
     simpleWindowsQuality: { get: function () { return element(by.css('label[for="windowsQualitySimple"]')); }},
     normalWindowsQuality: { get: function () { return element(by.css('label[for="windowsQualityNormal"]')); }},
     highWindowsQuality: { get: function () { return element(by.css('label[for="windowsQualityHigh"]')); }},
     luxuryWindowsQuality: { get: function () { return element(by.css('label[for="windowsQualityLuxury"]')); }},

     simpleWindowsCondition: { get: function () { return element(by.css('label[for="windowsConditionLuxury"]')); }},
     highWindowsCondition: { get: function () { return element(by.css('label[for="windowsConditionHigh"]')); }},
     luxuryWindowsCondition: { get: function () { return element(by.css('label[for="windowsConditionSimple"]')); }},

     //Suggest Block
     scoreQuality: { get: function () { return element(by.css('[ng-if="$ctrl.userInput.quality !== undefined"]')); }},
     scoreCondition: { get: function () { return element(by.css('[ng-if="$ctrl.userInput.condition !== undefined"]')); }},
     scoreLocation: { get: function () { return element(by.css('[ng-if="$ctrl.userInput.microlocation !== undefined"]')); }},
     editScores: { get: function () { return element(by.css('[ng-click="$ctrl.slideIn()"]')); }},
     scoreQualitySlider: { get: function () { return element(by.id('quality')); }},
     scoreConditionSlider: { get: function () { return element(by.id('condition')); }},
     scoreLocationSlider: { get: function () { return element(by.id('microlocation')); }},
     saveQCL: { get: function () { return element(by.css('[ng-click="$ctrl.saveQCL()"]')); }},

     //Valuation Block
     getValuation: { get: function () { return element(by.css('[ng-click="$ctrl.valuate()"]')); }},
     
     //Function to click button with EC
     clickButton: { value: function (webelement) {
            browser.wait(EC.elementToBeClickable(webelement), 5000);
            return webelement.click();
        }
     },


    //navigation menu objects
     logoutLink: { get: function () { return element(by.buttonText("Logout")); }},
     logout:{ value: function () { return this.logoutLink.click(); }}
});

module.exports = InputPage;
