'use strict';

var OverviewPage = function () {
};

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
     //Move this to another .page
     leftMenuInput: { get: function () { return element(by.xpath('/html/body/div[1]/div/ui-view/aside/main-menu/nav/ul/li[1]/a')); }},

     //Overview Scores
     noiseScore: { get: function () { return element(by.css('[ng-if="$ctrl.noiseScore"]')); }},
     viewScore: { get: function () { return element(by.css('[ng-if="$ctrl.viewScore"]')); }},
     immisionsScore: { get: function () { return element(by.css('[ng-if="$ctrl.immisionsScore"]')); }},
     shoppingScore: { get: function () { return element(by.css('[ng-if="$ctrl.shoppingScore"]')); }},
     familyScore: { get: function () { return element(by.css('[ng-if="$ctrl.familyScore"]')); }}
});

module.exports = OverviewPage;
