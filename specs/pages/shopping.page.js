'use strict';

var ShoppingPage = function () {};

 ShoppingPage.prototype = Object.create({}, {
    //---------------------------Info Pane items-------------------------------------------------
     shoppingLabel: { get: function () { return element.all(by.css('[ng-if="!$root.confirmationStarted"]')); }},
     shoppingScore: { get: function () { return element(by.css('[ng-if="shoppingScore"]')); }}
});

module.exports = ShoppingPage;
