import React, { Fragment } from "react";
import { number, object, array, bool, string } from "prop-types";
import {translate} from "react-i18next";

import closeIcon from "../../assets/NumberPicker/icon/close.png";

const MultiPickerMobile = ({
    ticketModalToOpenFor,
    pickerMethods,
    pickerMobileMethods,
    modalOpen,
    numbersAmount,
    bonusAmount,
    maxNumber,
    minNumber,
    maxBonus,
    minBonus,
    ballsTheme,
    bonusName,
    pluralBonusName,
    done,
    t}) => {
    return (
        <Fragment>
            <div className="frame picker-mob_frame">
                <h4 className="frame_title" dangerouslySetInnerHTML={{__html: t("title", 
                    {numbersAmount, minNumber, maxNumber, bonusAmount, bonusName: bonusAmount <= 1 ? bonusName : pluralBonusName, minBonus, maxBonus})}}> 
                </h4>
                <button className="btn-general btn-green picker_quick-btn" onClick={pickerMobileMethods.quickPickForAllMobile}> 
                    {t("quickPickBtn")}</button>
                <div className="picker-mob_frame_bottom">
                    {t("or")}{" "}
                    <button
                        className="picker-mob_pick-btn"
                        onClick={() => pickerMobileMethods.openMobileModal()}
                    >
                        {t("pickNumbersBtn")}
                    </button>
                </div>
            </div>
            {modalOpen && (
                <div className="picker-mob_modal">
                    <div className="picker-mob_modal_head">
                        <img src={closeIcon} alt="close modal" onClick={pickerMobileMethods.closeMobileModal} />
                        <p
                            onClick={() => (done ? pickerMobileMethods.closeMobileModal() : false)}
                            className={done ? "picker-mob_modal_head_done" : ""}
                        >
              				{t("done")}
                        </p>
                    </div>
                    <div className="picker-mob_modal_body">
                        {!done ? (
                            <div className="picker-mob_head">
                                <h4 className="picker-mob_head_title" dangerouslySetInnerHTML={{__html: t("title", 
                                    {numbersAmount, bonusAmount, maxNumber, minNumber, maxBonus, minBonus, bonusName: bonusAmount <= 1 ? bonusName : pluralBonusName,})}}>
                                </h4>
                                <p className="picker-mob_head_pale-text">{t("or")}</p>
                                <button
                                    className="btn-general btn-green picker_quick-btn"
                                    onClick={() => pickerMethods.quickPick(ticketModalToOpenFor)}
                                >
                  				{t("quickPickBtn")}
                                </button>
                            </div>
                        ) : (
                            <div className="picker-mob_head">
                                <h4 className="picker-mob_head_title">{t("modalTitleCompleted")}</h4>
                                <button
                                    className="btn-general btn-green picker_quick-btn"
                                    onClick={pickerMobileMethods.closeMobileModal}
                                >
                  				{t("done")}
                                </button>
                            </div>
                        )}

                        <div className={`picker-mob_modal_frame -theme_${ballsTheme}`}>
                            <div className="picker_nums">
                                <div className="picker-mob_nums_head">
                                    {pickerMobileMethods.genNumbersMobileHeader().map(item => item)}
                                </div>
                                <div className="picker_nums_subwrap">
                                    {pickerMobileMethods.generateNumbersMobile(maxNumber)}
                                </div>
                            </div>
                            <div className="picker_bonus">
                                {/* <h5 className="picker_nums_title">{pickerMethods.genBonusHeader()}</h5> */}
                                <div className="picker_bonus_subwrap">
                                    {pickerMobileMethods.generateBonusNumsMobile(maxBonus)}
                                </div>
                            </div>
                        </div>
                        {done && (
                            <button
                                onClick={pickerMobileMethods.closeMobileModal}
                                className="picker-mob_modal_done-btn"
                            >
                			{t("done")}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </Fragment>
    );
};

MultiPickerMobile.propTypes = {
    pickedNums: array,
    pickedBonus: array,
    pickerMethods: object.isRequired,
    pickerMobileMethods: object.isRequired,
    numbersAmount: number.isRequired,
    bonusAmount: number.isRequired,
    maxNumber: number.isRequired,
    maxBonus: number.isRequired,
    ballsTheme: string.isRequired,
    modalOpen: bool,
    done: bool,
    ticketModalToOpenFor: number.isRequired
};

export default translate("multiPickerText")(MultiPickerMobile);
