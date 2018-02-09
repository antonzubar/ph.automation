'use strict';

var SimilarOffersPage = function () {};

 SimilarOffersPage.prototype = Object.create({}, {
    //---------------------------Info Pane items-------------------------------------------------
     similarOffersLabel: { get: function () { return element.all(by.css('[ng-if="!$root.confirmationStarted"]')); }}
});

module.exports = SimilarOffersPage;
