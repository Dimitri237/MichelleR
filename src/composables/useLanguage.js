import { ref } from "vue";

import fr from "../locales/fr";
import en from "../locales/en";

const browserLang = navigator.language.startsWith("fr")
    ? "fr"
    : "en";

const language = ref(browserLang);

const translations = {
    fr,
    en
};

export function useLanguage() {

    const t = (path) => {

        const keys = path.split(".");

        let value = translations[language.value];

        for (const key of keys) {
            value = value?.[key];
        }

        return value ?? path;
    };

    const changeLanguage = (lang) => {

        if (translations[lang]) {
            language.value = lang;
            localStorage.setItem("language", lang);
        }

    };
const browserLang =
    localStorage.getItem("language") ||
    (navigator.language.startsWith("fr") ? "fr" : "en");

const language = ref(browserLang);
    return {
        language,
        t,
        changeLanguage
    };
}