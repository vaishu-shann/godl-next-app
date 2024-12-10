import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./translations/en.json";
import esTranslation from "./translations/es.json";
import filTranslation from "./translations/fil.json";
import frTranslation from "./translations/fr.json";
import hiTranslation from "./translations/hi.json";
import urTranslation from "./translations/ur.json";
import arTranslation from "./translations/ar.json";
import zhTranslation from "./translations/zh.json";
import viTranslation from "./translations/vi.json";
import thTranslation from "./translations/th.json";
import jaTranslation from "./translations/ja.json";
import bnTranslation from "./translations/bn.json";
import koTranslation from "./translations/ko.json";
import ruTranslation from "./translations/ru.json";
import ukTranslation from "./translations/uk.json";
import idTranslation from "./translations/id.json";
import huTranslation from "./translations/hu.json";
import deTranslation from "./translations/de.json";
import ptTranslation from "./translations/pt.json";
import itTranslation from "./translations/it.json";
import swTranslation from "./translations/sw.json";
import haTranslation from "./translations/ha.json";
import nlTranslation from "./translations/nl.json";
import trTranslation from "./translations/tr.json";


const resources = { 
  en: {
    translation: enTranslation,
  },
  es: {
    translation: esTranslation,
  },
  fil: {
    translation: filTranslation,
  },
  fr: {
    translation: frTranslation,
  },
  hi: {
    translation: hiTranslation,
  },
  ur: {
    translation: urTranslation,
  },
  ar: {
    translation: arTranslation,
  },
  zh: {
    translation: zhTranslation,
  },
  vi: {
    translation: viTranslation,
  },
  th: {
    translation: thTranslation,
  },
  ja: {
    translation: jaTranslation,
  },
  bn: {
    translation: bnTranslation,
  },
  ko: {
    translation: koTranslation,
  },
  ru: {
    translation: ruTranslation,
  },
  uk: {
    translation: ukTranslation,
  },
  id: {
    translation: idTranslation,
  },
  hu: {
    translation: huTranslation,
  },
  de: {
    translation: deTranslation,
  },
  pt: {
    translation: ptTranslation,
  },
  it: {
    translation: itTranslation,
  },
  sw: {
    translation: swTranslation,
  },
  ha: {
    translation: haTranslation,
  },
  nl: {
    translation: nlTranslation,
  },
  tr: {
    translation: trTranslation,
  },
};


i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Set the default language
  fallbackLng: "en", // Fallback language if a translation is missing
  interpolation: {
    escapeValue: false, // Allows you to use HTML tags in translations
  },
});

export default i18n;
