'use strict';

var OverviewPage = function () {
};
var EC = protractor.ExpectedConditions;

 OverviewPage.prototype = Object.create({}, {
    //---------------------------Info Pane objects-------------------------------------------------
    //Real estate's elements
     address: { get: function () { return element(by.className('dib-cur-prop__location-address')); }},
     overviewLivingArea: { get: function () { return element(by.css('[ng-if="$ctrl.propertyProps.livingArea >= 0"]')); }},
     overviewBuildingYear: { get: function () { return element(by.css('[ng-if="$ctrl.propertyProps.buildingYear"]')); }},
     overviewNumberOfRooms: { get: function () { return element(by.css('[ng-if="$ctrl.propertyProps.numberOfRooms >= 0"]')); }},
     overviewFloorNumber: { get: function () { return element(by.css('[ng-if="!$ctrl.isHouse && $ctrl.propertyProps.floorNumber >= 0"]')); }},
     overviewNumberOfBathrooms: { get: function () { return element(by.css('[ng-if="$ctrl.propertyProps.numberOfBathrooms >= 0"]')); }},
     overviewBalconyArea: { get: function () { return element(by.css('[ng-if="$ctrl.propertyProps.balconyArea >= 0"]')); }},
     overviewNumberOfGarages: { get: function () { return element(by.css('[ng-if="$ctrl.propertyProps.numberOfGarages >= 0"]')); }},
     overviewNumberOfParkingSpots: { get: function () { return element(by.css('[ng-if="$ctrl.propertyProps.numberOfParkingSpots >= 0"]')); }},
     overviewLift: { get: function () { return element(by.css('[ng-if="!$ctrl.isHouse && $ctrl.propertyProps.lift"]')); }},

     //Overview Scores
     noiseScore: { get: function () { return element(by.css('[ng-if="$ctrl.noiseScore"]')); }},
     viewScore: { get: function () { return element(by.css('[ng-if="$ctrl.viewScore"]')); }},
     immisionsScore: { get: function () { return element(by.css('[ng-if="$ctrl.immisionsScore"]')); }},
     shoppingScore: { get: function () { return element(by.css('[ng-if="$ctrl.shoppingScore"]')); }},
     familyScore: { get: function () { return element(by.css('[ng-if="$ctrl.familyScore"]')); }},

     //Market and Similar navigations
     marketGoExplore: { get: function () { return element(by.css('[ng-click="$ctrl.goToMarket()"]')); }},
     similarGoExplore: { get: function () { return element(by.css('[ng-click="$ctrl.goToSimilarOverview()"]')); }},

     //Widget/buttons in Similar block
     activeOffersInAreaButton: {
         get: function () {
             return element(by.css('[card-data="$ctrl.offers.online"]')).element(by.css('[ng-click="$ctrl.handleClick()"]'));
         }
     },
     historicOffersInAreaButton: {
         get: function () {
             return element(by.css('[card-data="$ctrl.offers.lastYears"]')).element(by.css('[ng-click="$ctrl.handleClick()"]'));
         }
     },

     //Quantity of Active & Historic similar offers
     activeOffersInArea: {
         get: function () {
             return element(by.css('[card-data="$ctrl.offers.online"]')).element(by.css('[ng-if="$ctrl.cardData.quantity || $ctrl.cardData.quantity"]'));
         }
     },
     historicOffersInArea: {
         get: function () {
             return element(by.css('[card-data="$ctrl.offers.lastYears"]')).element(by.css('[ng-if="$ctrl.cardData.quantity || $ctrl.cardData.quantity"]'));
         }
     },

     //Function to click button with EC
     waitElement: { value: function (webelement) {
            browser.wait(EC.visibilityOf(webelement), 10000);
        }
     }
});

module.exports = OverviewPage;
