// import the original type declarations
import 'i18next';
// import all namespaces (for the default language, only)
import common from '../i18n/locales/es/common';
import user from '../i18n/locales/es/user';
import es from '../i18n/locales/es';
declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: 'translation';
    // custom resources type
    resources: {
      translation: typeof es.translation;
      common: typeof common;
      user: typeof user;
    };
    nsSeparator: '.';
    // other
  }
}
