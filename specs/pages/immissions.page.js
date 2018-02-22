'use strict';

var ImmissionsPage = function () {};
var EC = protractor.ExpectedConditions;

 ImmissionsPage.prototype = Object.create({}, {
    //---------------------------Info Pane items-------------------------------------------------
     immissionsLabel: { get: function () { return element.all(by.css('[ng-if="!$root.confirmationStarted"]')); }},
     immissionsScore: { get: function () { return element(by.css('[ng-if="immisionsScore"]')); }},
     waitForScore: { value: function (webelement, scoreValue) {
            browser.wait(EC.textToBePresentInElement(webelement, scoreValue), 15000);
        }
     }
});

module.exports = ImmissionsPage;
