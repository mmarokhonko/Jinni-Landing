import React from "react";
import {string} from "prop-types";

import Timer from "./Timer";

import iconArrow from "../../assets/Help/icons/ic_arrow.svg";
import iconPick from "../../assets/Help/icons/ic_pick.svg";
import iconGet from "../../assets/Help/icons/ic_get.svg";
import iconCollect from "../../assets/Help/icons/ic_collect.svg";

const Help = ({drawDate}) => {
    return (
        <section className="help">
            <div className="cont-zone">
                <h2 className="help_title">How to play Megamillions</h2>
                <div className="help_subwrap">
                    <div className="help_step">
                        <img src={iconPick} alt="" className="help_step_icon" />
                        <h4 className="help_step_title">Pick your lucky numbers</h4>
                        <p className="help_step_text">
                        Choose 5 numbers + 1 bonus number or simply click &quot;QUick Pick&quot;
                        for a random selection </p>
                    </div>
                    <img src={iconArrow} alt="next" className="help_arrow" />
                    <div className="help_step">
                        <img src={iconGet} alt="" className="help_step_icon" />
                        <h4 className="help_step_title">GET YOUR BET LINE FOR FREE</h4>
                        <p className="help_step_text">
                        Fill out the short form and then click &quot;Claim<br/>
                        Free Bet&quot; to secure your bet line for free 
                        </p>
                    </div>
                    <img src={iconArrow} alt="next" className="help_arrow" />
                    <div className="help_step">
                        <img src={iconCollect} alt="" className="help_step_icon" />
                        <h4 className="help_step_title">Collect your winnings</h4>
                        <Timer drawDate={drawDate}/>
                    </div>
                </div>
            </div>
        </section>
    );
};

Help.propTypes = {
    drawDate: string.isRequired
}

export default Help;
