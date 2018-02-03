'use strict';

var LeftMenu = function () {};

 LeftMenu.prototype = Object.create({}, {
    //---------------------------Navigation Items-------------------------------------------------
    //Navigation bar for Switzerland
     menuItems: { get: function () { return element.all(by.className('dib-nav__menu-link layout-wrap ng-isolate-scope layout-align-center-center layout-row')); }}
});

module.exports = LeftMenu;
