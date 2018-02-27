import React from "react";

import Timer from "./Timer";

import iconArrow from "../../assets/Help/icons/ic_arrow.svg";
import iconPick from "../../assets/Help/icons/ic_pick.svg";
import iconGet from "../../assets/Help/icons/ic_get.svg";
import iconCollect from "../../assets/Help/icons/ic_collect.svg";

const Help = () => {
    return (
        <section className="help">
            <div className="cont-zone">
                <h2 className="help_title">How to play Megamillions</h2>
                <div className="help_subwrap">
                    <div className="help_step">
                        <img src={iconPick} alt="" className="help_step_icon" />
                        <h4 className="help_step_title">Pick your lucky numbers</h4>
                        <p className="help_step_text">
              Select 5 numbers from 1-70 + a bonus number from 1-25. Or we can randomly choose for
              you when you click “Quick Pick.”
                        </p>
                    </div>
                    <img src={iconArrow} alt="next" className="help_arrow" />
                    <div className="help_step">
                        <img src={iconGet} alt="" className="help_step_icon" />
                        <h4 className="help_step_title">GET 3 FREE BET LINES</h4>
                        <p className="help_step_text">
              Submit the form to place 4 bet lines <br/> 
              for the price of 1.
                        </p>
                    </div>
                    <img src={iconArrow} alt="next" className="help_arrow" />
                    <div className="help_step">
                        <img src={iconCollect} alt="" className="help_step_icon" />
                        <h4 className="help_step_title">Collect your winnings</h4>
                        <Timer drawDate="2018-04-27 19:30:00 UTC+11"/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Help;
