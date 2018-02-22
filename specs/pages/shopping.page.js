'use strict';

var ShoppingPage = function () {};
var EC = protractor.ExpectedConditions;

 ShoppingPage.prototype = Object.create({}, {
    //---------------------------Info Pane items-------------------------------------------------
     shoppingLabel: { get: function () { return element.all(by.css('[ng-if="!$root.confirmationStarted"]')); }},
     shoppingScore: { get: function () { return element(by.css('[ng-if="shoppingScore"]')); }},
     waitForScore: { value: function (webelement, scoreValue) {
            browser.wait(EC.textToBePresentInElement(webelement, scoreValue), 15000);
        }
     }
});

module.exports = ShoppingPage;
