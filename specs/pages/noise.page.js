'use strict';

var NoisePage = function () {};

 NoisePage.prototype = Object.create({}, {
    //---------------------------Info Pane items-------------------------------------------------
     noiseLabel: { get: function () { return element.all(by.css('[ng-if="!$root.confirmationStarted"]')); }}
});

module.exports = NoisePage;
