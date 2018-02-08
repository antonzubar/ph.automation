'use strict';

var ShoppingPage = function () {};

 ShoppingPage.prototype = Object.create({}, {
    //---------------------------Info Pane items-------------------------------------------------
     shoppingLabel: { get: function () { return element.all(by.css('[ng-if="!$root.confirmationStarted"]')); }}
});

module.exports = ShoppingPage;
