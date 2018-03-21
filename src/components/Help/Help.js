import React from "react";
import { string } from "prop-types";
import Media from "react-media";

import Timer from "./Timer";

import pickerLottoData from "../NumberPicker/pickerLottoData";
import helpLottoData from "./helpLottoData";

import iconArrow from "../../assets/Help/icons/ic_arrow.svg";
import iconPick from "../../assets/Help/icons/ic_pick.svg";
import iconGet from "../../assets/Help/icons/ic_get.svg";
import iconCollect from "../../assets/Help/icons/ic_collect.svg";

const Help = ({ drawDate, lotto }) => {
    const currHelpLottoData = helpLottoData[lotto];
    const currPickerLottoData = pickerLottoData[lotto];
    return (
        <section className="help">
            <div className="cont-zone">
                <h2 className="help_title">How to play Megamillions</h2>
                <div className="help_subwrap">
                    <div className="help_step">
                        <img src={iconPick} alt="" className="help_step_icon" />
                        <h4 className="help_step_title">Pick your lucky numbers</h4>
                        {currHelpLottoData.firstStep(currPickerLottoData)}
                    </div>
                    <img src={iconArrow} alt="next" className="help_arrow" />
                    <div className="help_step">
                        <img src={iconGet} alt="" className="help_step_icon" />
                        <h4 className="help_step_title">Get your bet line for free</h4>
                        <Media query="(min-width: 768px)">
                            {matches =>
                                matches ? (
                                    <p className="help_step_text">
                    Fill out the short form and then click &quot;Claim<br className="hide-sm" />
                    Free Bet&quot; to secure your bet line for free
                                    </p>
                                ) : (
                                    <p className="help_step_text">
                    To place your bet for free, just fill <br className="hide-sm" />
                    out the short form and click <br />
                    “Claim Free Bet”
                                    </p>
                                )
                            }
                        </Media>
                    </div>
                    <img src={iconArrow} alt="next" className="help_arrow" />
                    <div className="help_step">
                        <img src={iconCollect} alt="" className="help_step_icon" />
                        <h4 className="help_step_title">Collect your winnings</h4>
                        <Timer lotto={lotto} drawDate={drawDate} />
                    </div>
                </div>
            </div>
        </section>
    );
};

Help.propTypes = {
    drawDate: string.isRequired,
    lotto: string.isRequired
};

export default Help;
