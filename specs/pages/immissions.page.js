'use strict';

var ImmissionsPage = function () {};

 ImmissionsPage.prototype = Object.create({}, {
    //---------------------------Info Pane items-------------------------------------------------
     immissionsLabel: { get: function () { return element.all(by.css('[ng-if="!$root.confirmationStarted"]')); }}
});

module.exports = ImmissionsPage;
