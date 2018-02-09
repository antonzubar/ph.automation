'use strict';

var MarketPage = function () {};

//comment
 MarketPage.prototype = Object.create({}, {
    //---------------------------Info Pane items-------------------------------------------------
     marketLabel: { get: function () { return element.all(by.css('[ng-if="!$root.confirmationStarted"]')); }}
});

module.exports = MarketPage;
