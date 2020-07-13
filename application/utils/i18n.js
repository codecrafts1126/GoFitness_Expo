import ReactNative from 'react-native';
import moment from 'moment';
import I18n from 'i18n-js';

// Import all locales
import en from '../translations/en.json';
import he from '../translations/he.json';
import ar from '../translations/ar.json';

// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;

// Define the supported translations
I18n.translations = {
  en,
  he,
  ar
};

const currentLocale = I18n.currentLocale();

// Is it a RTL language?
export const isRTL = currentLocale.indexOf('he') === 0 || currentLocale.indexOf('ar') === 0;

// Allow RTL alignment in RTL languages
ReactNative.I18nManager.allowRTL(isRTL);

// Localizing momentjs to Hebrew, Arabic or English
if (currentLocale.indexOf('he') === 0) {
  require('moment/locale/he.js');
  moment.locale('he');
} else {
    if (currentLocale.indexOf('ar') === 0) {
        require('moment/locale/ar.js');
        moment.locale('ar');
    }
    else {
        moment.locale('en');
    }
}

// The method we'll use instead of a regular string
export function strings(name, params = {}) {
  return I18n.t(name, params);
};

export default I18n;