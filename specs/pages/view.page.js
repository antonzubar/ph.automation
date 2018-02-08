'use strict';

var ViewPage = function () {};

 ViewPage.prototype = Object.create({}, {
    //---------------------------Info Pane items-------------------------------------------------
     viewLabel: { get: function () { return element.all(by.css('[ng-if="!$root.confirmationStarted"]')); }}
});

module.exports = ViewPage;