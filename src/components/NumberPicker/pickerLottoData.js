import i18n from "../../tools/i18nextSetup";

const lottoData = {
    "megamillions": {
        maxNumber: 70,
        maxBonus: 25,
        minNumber: 1,
        minBonus:1,
        numbersAmount: 5,
        bonusAmount: 1,
        bonusName: i18n.t("pickerData:megamillions.bonusName"),
        pluralBonusName: i18n.t("pickerData:megamillions.pluralBonusName"),
        ballsTheme: "blue-yellow",
        price: "€2.80"
    },
    "euromillions": {
        maxNumber: 50,
        maxBonus: 12,
        minNumber: 1,
        minBonus:1,
        numbersAmount: 5,
        bonusAmount: 2,
        bonusName: i18n.t("pickerData:euromillions.bonusName"),
        pluralBonusName: i18n.t("pickerData:euromillions.pluralBonusName"),
        ballsTheme: "blue-yellow",
        price: "€2.50"			
    },
    "eurojackpot": {
        maxNumber: 50,
        maxBonus: 10,
        minNumber: 1,
        minBonus:1,
        numbersAmount: 5,
        bonusAmount: 2,
        bonusName: i18n.t("pickerData:eurojackpot.bonusName"),
        pluralBonusName: i18n.t("pickerData:eurojackpot.pluralBonusName"),
        ballsTheme: "yellow-red",
        price: "€2.00"			
    },
    "powerball": {
        maxNumber: 69,
        maxBonus: 26,
        minNumber: 1,
        minBonus:1,
        numbersAmount: 5,
        bonusAmount: 1,
        bonusName: i18n.t("pickerData:powerball.bonusName"),
        pluralBonusName: i18n.t("pickerData:powerball.pluralBonusName"),
        ballsTheme: "red-yellow",
        price: "€2.80"			
    },
    "6aus49": {
        maxNumber: 49,
        maxBonus: 9,
        minNumber: 1,
        minBonus:0,
        numbersAmount: 6,
        bonusAmount: 1,
        bonusName: i18n.t("pickerData:6aus49.bonusName"),
        pluralBonusName: i18n.t("pickerData:6aus49.pluralBonusName"),
        ballsTheme: "red-yellow",
        price: "€1.00"			
    }
}

export default lottoData