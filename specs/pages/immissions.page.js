'use strict';

var ImmissionsPage = function () {};

 ImmissionsPage.prototype = Object.create({}, {
    //---------------------------Info Pane items-------------------------------------------------
     immissionsLabel: { get: function () { return element.all(by.css('[ng-if="!$root.confirmationStarted"]')); }},
     immissionsScore: { get: function () { return element(by.css('[ng-if="immisionsScore"]')); }}
});

module.exports = ImmissionsPage;
