import React, { Fragment } from "react";
import { number, object, array, bool, string, func, oneOfType } from "prop-types";
import {translate} from "react-i18next";

import closeIcon from "../../assets/NumberPicker/icon/close.png";

const NumberPickerMobile = ({ 
    pickerMethods, 
    pickerMobileMethods, 
    modalOpen, 
    numbersAmount, 
    bonusAmount, 
    maxNumber, 
    maxBonus, 
    minBonus,
    minNumber,
    bonusName,
    pluralBonusName,
    ballsTheme, 
    done,
    t }) => {
    const openModal = pickerMobileMethods.openMobileModal;
    return (
        <Fragment>
            <div className="frame picker-mob_frame">
                <h4 className="frame_title" dangerouslySetInnerHTML={{__html: bonusAmount > 0 ?
                    t("mobile.frameTitle",
                        {numbersAmount, maxNumber, minNumber, bonusAmount, bonusName: bonusAmount <= 1 ? bonusName : pluralBonusName, maxBonus, minBonus})
                    :  t("mobile.frameTitleNoBonus",
                        {numbersAmount, maxNumber, minNumber})
                }}>
                </h4>
                <button
                    className="btn-general btn-green picker_quick-btn"
                    onClick={pickerMethods.quickPick}
                >
                    {t("desktop.quickPickBtn")}
                </button>
                <div className="picker-mob_frame_bottom">
                    {t("mobile.or")} <button className="picker-mob_pick-btn" onClick={() => openModal()}>{t("mobile.pickNumbersBtn")}</button>
                </div>
            </div>
            {modalOpen && (
                <div className="picker-mob_modal">
                    <div className="picker-mob_modal_head">
                        <img src={closeIcon} alt="close modal" onClick={pickerMobileMethods.closeMobileModal} />
                        <p
                            onClick={() => done ? pickerMobileMethods.closeMobileModal() : false}
                            className={done ? "picker-mob_modal_head_done" : ""}
                        >
              			{t("mobile.done")}
                        </p>
                    </div>
                    <div className="picker-mob_modal_body">
                        {!done ? (
                            <div className="picker-mob_head">
                                <h4 className="picker-mob_head_title" dangerouslySetInnerHTML={{__html: bonusAmount > 0 ?
                                    t("mobile.frameTitle",
                                        {numbersAmount, bonusAmount, maxNumber, minNumber, maxBonus, minBonus, bonusName: bonusAmount <= 1 ? bonusName : pluralBonusName})
                                    :  t("mobile.frameTitle",
                                        {numbersAmount, bonusAmount, maxNumber, minNumber})
                                }}>
                                </h4>
                                <p className="picker-mob_head_pale-text">{t("mobile.or")}</p>
                                <button
                                    className="btn-general btn-green picker_quick-btn"
                                    onClick={() => pickerMethods.quickPick()}
                                >
                  				{t("desktop.quickPickBtn")}
                                </button>
                            </div>
                        ) : (
                            <div className="picker-mob_head">
                                <h4 className="picker-mob_head_title">{t("mobile.headerCompleted")}</h4>
                                <button
                                    className="btn-general btn-green picker_quick-btn"
                                    onClick={pickerMobileMethods.closeMobileModal}
                                >
                                    {t("mobile.done")}
                                </button>
                            </div>
                        )}
                        <div className={`picker-mob_modal_frame -theme_${ballsTheme}`}>
                            <div className="picker_nums">
                                <div className="picker-mob_nums_head">{pickerMobileMethods.genNumbersMobileHeader().map(item => item)}</div>
                                <div className="picker_nums_subwrap">{pickerMethods.generateNumbers()}</div>
                            </div>
                            <div className="picker_bonus">
                                <h5 className="picker_nums_title">{pickerMethods.genBonusHeader()}</h5>
                                <div className="picker_bonus_subwrap">{pickerMethods.generateBonusNums()}</div>
                            </div>
                        </div>
                        {done && <button onClick={pickerMobileMethods.closeMobileModal} className="picker-mob_modal_done-btn">{t("mobile.done")}</button>}						
                    </div>
                </div>
            )}
        </Fragment>
    );
};

NumberPickerMobile.propTypes = {
    pickedNums: oneOfType([array, object]),
    pickedBonus: oneOfType([array, object]),
    pickerMethods: object.isRequired,
    pickerMobileMethods: object.isRequired,
    numbersAmount: number.isRequired,
    bonusAmount: number.isRequired,
    maxNumber: number.isRequired,
    maxBonus: number.isRequired,
    minNumber: number.isRequired,
    minBonus: number.isRequired,
    bonusName: string.isRequired,
    pluralBonusName: string.isRequired,
    t:func.isRequired,
    ballsTheme: string.isRequired,
    modalOpen: bool,
    done: bool
};

export default translate("singlePickerText")(NumberPickerMobile);
