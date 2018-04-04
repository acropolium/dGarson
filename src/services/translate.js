import React, { Component } from 'react';
import { AsyncStorage, Platform, NativeModules } from 'react-native';

import I18n from 'react-native-i18n';
import translations from '../translations/i18n.js';

let defaultLang = 'ua';

I18n.translations = translations;

function getLocale() {
    return I18n.currentLocale().substr(0, 2);
}

function loadLang() {
    let deviceLang = defaultLang;

    I18n.fallbacks = true;

    let allowedLangs = ['en', 'ua'];

    let deviceLocale = getLocale() || defaultLang;

    allowedLangs.forEach(function(val) {
        if (deviceLocale.indexOf(val) !== -1) {
            deviceLang = val;
        }
    });

    return deviceLang;
}

I18n.locale = loadLang();

module.exports = I18n;
