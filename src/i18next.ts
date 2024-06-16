import { transition } from "@cloudinary/url-gen/actions/effect";
import i18next from "i18next";
import i18nextBrowserLanguagedetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import fa from "./translations/fa.json";
import en from "./translations/en.json";

i18next
  .use(i18nextBrowserLanguagedetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fa: { translation: fa },
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    returnObjects: true,
  });

export default i18next;
