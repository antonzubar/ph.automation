'use strict';

var ViewPage = function () {};
var EC = protractor.ExpectedConditions;

 ViewPage.prototype = Object.create({}, {
    //---------------------------Info Pane items-------------------------------------------------
     viewLabel: { get: function () { return element.all(by.css('[ng-if="!$root.confirmationStarted"]')); }},
     viewScore: { get: function () { return element(by.css('[ng-if="viewScore"]')); }},
     waitForScore: { value: function (webelement, scoreValue) {
            browser.wait(EC.textToBePresentInElement(webelement, scoreValue), 15000);
        }
     }
});

module.exports = ViewPage;