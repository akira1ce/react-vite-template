import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en";
import zh from "@/locales/zh";

i18n.use(initReactI18next).init({
	resources: {
		zh,
		en,
	},
	lng: "zh",
	fallbackLng: "en",
	defaultNS: "common",
	interpolation: { escapeValue: false },
});

export default i18n;
