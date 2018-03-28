const lottoData = {
    "mega millions": {
        maxNumber: 70,
        maxBonus: 25,
        minNumber: 1,
        minBonus:1,
        numbersAmount: 5,
        bonusAmount: 1,
        bonusName: "Bonus Number",
        ballsTheme: "blue-yellow"	
    },
    "euromillions": {
        maxNumber: 50,
        maxBonus: 12,
        minNumber: 1,
        minBonus:1,
        numbersAmount: 5,
        bonusAmount: 2,
        bonusName: "Lucky Star",
        ballsTheme: "blue-yellow"			
    },
    "eurojackpot": {
        maxNumber: 50,
        maxBonus: 10,
        minNumber: 1,
        minBonus:1,
        numbersAmount: 5,
        bonusAmount: 2,
        bonusName: "Euro Ball",
        ballsTheme: "yellow-red"			
    },
    "powerball": {
        maxNumber: 69,
        maxBonus: 26,
        minNumber: 1,
        minBonus:1,
        numbersAmount: 5,
        bonusAmount: 1,
        bonusName: "bonus number",
        ballsTheme: "red-yellow"			
    },
    "6 aus 49": {
        maxNumber: 49,
        maxBonus: 9,
        minNumber: 1,
        minBonus:0,
        numbersAmount: 6,
        bonusAmount: 1,
        bonusName: "Superball",
        ballsTheme: "red-yellow",
        includeZeroBonusNumber: true			
    }
}

export default lottoData