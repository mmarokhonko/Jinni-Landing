import i18n from "i18next";
import enText from "../localisation/en-text.json";
import deText from "../localisation/de-text.json";
i18n.init({
    fallbackLng: "en",
    lng: "en",
    keySeparator: false,
    interpolation: {
        formatSeparator: ","
	  },
    resources: {
        en: {
            AppText: enText.AppText,
            headerDesktopText: enText.headerDesktopText,
            headerMobileText: enText.headerMobileText,
            helpSectionText: enText.helpSectionText,
            pickerData: enText.pickerData,
            singlePickerText: enText.singlePickerText,
            multiPickerText: enText.multiPickerText,
            formText: enText.formText,
            factSectionText: enText.factSectionText,
            footerText: enText.footerText
        },
        de: {
            AppText: deText.AppText,
            headerDesktopText: deText.headerDesktopText,
            headerMobileText: deText.headerMobileText,
            helpSectionText: deText.helpSectionText,
            pickerData: deText.pickerData,
            singlePickerText: deText.singlePickerText,
            multiPickerText: deText.multiPickerText,
            formText: deText.formText,
            factSectionText: deText.factSectionText,
            footerText: deText.footerText
        }
    }
})

export default i18n;