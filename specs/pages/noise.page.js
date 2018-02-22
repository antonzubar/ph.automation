'use strict';

var NoisePage = function () {};
var EC = protractor.ExpectedConditions;

 NoisePage.prototype = Object.create({}, {
    //---------------------------Info Pane items-------------------------------------------------
     noiseLabel: { get: function () { return element.all(by.css('[ng-if="!$root.confirmationStarted"]')); }},
     quietScore: { get: function () { return element(by.css('[ng-if="quietScore"]')); }},
     waitForScore: { value: function (webelement, scoreValue) {
            browser.wait(EC.textToBePresentInElement(webelement, scoreValue), 15000);
        }
     }
});

module.exports = NoisePage;
