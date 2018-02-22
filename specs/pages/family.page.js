'use strict';

var FamilyPage = function () {};
var EC = protractor.ExpectedConditions;

//comment
 FamilyPage.prototype = Object.create({}, {
    //---------------------------Info Pane items-------------------------------------------------
     familyLabel: { get: function () { return element.all(by.css('[ng-if="!$root.confirmationStarted"]')); }},
     familyScore: { get: function () { return element(by.css('[ng-if="familyScore"]')); }},
     waitForScore: { value: function (webelement, scoreValue) {
            browser.wait(EC.textToBePresentInElement(webelement, scoreValue), 15000);
        }
     }
});

module.exports = FamilyPage;

