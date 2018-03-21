import megaBG from "../../assets/Header/bg/megamillions.png";
import megaBGMob from "../../assets/Header/mob-bg/megamillions.png";
import megaPeople from "../../assets/Header/people/megamillions.png";
import megaLogo from "../../assets/Header/logo/megamillions.png";

import euroMillBG from "../../assets/Header/bg/euromillions.png";
import euroMillBGMob from "../../assets/Header/mob-bg/euromillions.png";
import euroMillPeople from "../../assets/Header/people/euromillions.png";
import euroMillLogo from "../../assets/Header/logo/euromillions.png";

import euroJackBG from "../../assets/Header/bg/eurojackpot.png";
import euroJackBGMob from "../../assets/Header/mob-bg/eurojackpot.png";
import euroJackPeople from "../../assets/Header/people/eurojackpot.png";
import euroJackLogo from "../../assets/Header/logo/eurojackpot.png";

const allLottoData = {
    ["mega millions"]: {
        bg: megaBG,
        logo: megaLogo,
        currency: "$",
        bgMob: megaBGMob,
        people: megaPeople
    },
    ["euromillions"]: {
        bg: euroMillBG,
        logo: euroMillLogo,
        currency: "€",
        bgMob: euroMillBGMob,
        people: euroMillPeople
	},
	["eurojackpot"]: {
        bg: euroJackBG,
        logo: euroJackLogo,
        currency: "€",
        bgMob: euroJackBGMob,
        people: euroJackPeople
    }
}

export default allLottoData;