import React, { Fragment } from "react";
import { number, object, array, bool, string, oneOfType } from "prop-types";

import closeIcon from "../../assets/NumberPicker/icon/close.png";

const NumberPickerMobile = props => {
    const { pickerMethods, pickerMobileMethods, modalOpen, numbersAmount, bonusAmount, maxNumber, maxBonus, ballsTheme, done } = props;

    return (
        <Fragment>
            <div className="frame picker-mob_frame">
                <h4 className="frame_title">
				Pick {numbersAmount} numbers from 1-{maxNumber}<br />& {bonusAmount} bonus number{bonusAmount > 1 ? "s" : ""} from 1-{maxBonus}
                </h4>
                <button
                    className="btn-general btn-green picker_quick-btn"
                    onClick={pickerMethods.quickPick}
                >
          Quick Pick
                </button>
                <div className="picker-mob_frame_bottom">
          or <button className="picker-mob_pick-btn" onClick={() => pickerMobileMethods.openMobileModal()}>pick numbers</button>
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
              			DONE
                        </p>
                    </div>
                    <div className="picker-mob_modal_body">
                        {!done ? (
                            <div className="picker-mob_head">
                                <h4 className="picker-mob_head_title">
                  				Pick {numbersAmount} numbers <br />& {bonusAmount} bonus number{bonusAmount > 1
                                        ? "s"
                                        : ""}
                                </h4>
                                <p className="picker-mob_head_pale-text">or</p>
                                <button
                                    className="btn-general btn-green picker_quick-btn"
                                    onClick={() => pickerMethods.quickPick()}
                                >
                  				Quick Pick
                                </button>
                            </div>
                        ) : (
                            <div className="picker-mob_head">
                                <h4 className="picker-mob_head_title">All good here</h4>
                                <button
                                    className="btn-general btn-green picker_quick-btn"
                                    onClick={pickerMobileMethods.closeMobileModal}
                                >
                  Done
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
                        {done && <button onClick={pickerMobileMethods.closeMobileModal} className="picker-mob_modal_done-btn">DONE</button>}						
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
    ballsTheme: string.isRequired,
    modalOpen: bool,
    done: bool
};

export default NumberPickerMobile;
