import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import es from './locales/es';
import zh from './locales/zh';

export const resources = {
  en: es,
  zh: zh,
} as const;

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  resources,
  defaultNS: 'translation',
  fallbackLng: ['zh', 'en'],
});
