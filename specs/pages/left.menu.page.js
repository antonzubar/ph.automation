'use strict';

var LeftMenu = function () {};

 LeftMenu.prototype = Object.create({}, {
    //---------------------------Navigation Items-------------------------------------------------
    //Navigation bar for Switzerland
     menuItems: { get: function () { return element.all(by.className('dib-nav__menu-toggle ng-scope')); }},
     viewMapbutton: { get: function () { return element(by.css('[class="mapboxgl-ctrl-icon mapboxgl-ctrl-viewMap"]')); }},

     //Menu items
     menuInput: { get: function () { return element(by.xpath('//span[contains(text(), " Eingabe ")]')); }},
     menuOverview: { get: function () { return element.all(by.xpath('//span[contains(text(), " Überblick ")]')).first(); }},
     menuSimilar: { get: function () { return element(by.xpath('//span[contains(text(), " Ähnlich ")]')); }},
     menuSimilarOffers: { get: function () { return element(by.xpath('//span[contains(text(), " Angebote ")]')); }},
     menuMarket: { get: function () { return element(by.xpath('//span[contains(text(), " Markt ")]')); }},
     menuEnvironment: { get: function () { return element(by.xpath('//span[contains(text(), " Umwelt ")]')); }},
     menuNoise: { get: function () { return element(by.xpath('//span[contains(text(), " Geräusch ")]')); }},
     menuView: { get: function () { return element(by.xpath('//span[contains(text(), " Aussicht ")]')); }},
     menuImmisions: { get: function () { return element(by.xpath('//span[contains(text(), " Immissionen ")]')); }},
     menuDailyNeeds: { get: function () { return element(by.xpath('//span[contains(text(), " Tägliche Bedürfnisse ")]')); }},
     menuShopping: { get: function () { return element(by.xpath('//span[contains(text(), " Einkaufen ")]')); }},
     menuFamily: { get: function () { return element(by.xpath('//span[contains(text(), " Familie ")]')); }},
     menuTransport: { get: function () { return element(by.xpath('//span[contains(text(), " Transport ")]')); }},
     menuMyDash: { get: function () { return element(by.xpath('//span[contains(text(), " My Dash ")]')); }}

});

module.exports = LeftMenu;
