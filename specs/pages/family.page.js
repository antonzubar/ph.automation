'use strict';

var FamilyPage = function () {};

//comment
 FamilyPage.prototype = Object.create({}, {
    //---------------------------Info Pane items-------------------------------------------------
     familyLabel: { get: function () { return element.all(by.css('[ng-if="!$root.confirmationStarted"]')); }}
});

module.exports = FamilyPage;

