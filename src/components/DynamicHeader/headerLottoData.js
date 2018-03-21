import megaBG from "../../assets/Header/bg/megamillions.png";
import megaBGMob from "../../assets/Header/mob-bg/megamillions.png";
import megaPeople from "../../assets/Header/people/megamillions.png";
import megaLogo from "../../assets/Header/logo/megamillions.png";

import euroMillBG from "../../assets/Header/bg/euromillions.png";
import euroMillBGMob from "../../assets/Header/mob-bg/euromillions.png";
import euroMillPeople from "../../assets/Header/people/euromillions.png";
import euroMillLogo from "../../assets/Header/logo/euromillions.png";

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
    }
}

export default allLottoData;