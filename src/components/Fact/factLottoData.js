import i18n from "../../tools/i18nextSetup";
const factsData = i18n.t("factSectionText:facts", { returnObjects: true });

const lottoData = {
    "megamillions": ["The largest MegaMillions jackpot was a life-changing $656 million."],
    "euromillions": factsData.euromillions,
    "eurojackpot": ["EuroJackpot has 12 prize tiers and players are twice as likely to win compared to EuroMillions."],
    "powerball": ["Over half of all Powerball jackpots since 2012 exceed $100 million. Powerball doesn’t do small."],
    "6aus49": ["6aus49 gives away over €5 billion in prizes every single year."]
}


export default lottoData