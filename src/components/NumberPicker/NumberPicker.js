import React from "react";
import {number, object, array, string, bool, func, oneOfType} from "prop-types";
import {translate} from "react-i18next";

const NumberPicker = ({  
    pickerMethods, 
    numbersAmount, 
    bonusAmount, 
    bonusName,
    pluralBonusName,
    t, 
    done }) => {	
    return (
        <div className="frame picker_frame-vert">
            <h4 className="frame_title" dangerouslySetInnerHTML={{__html: bonusAmount > 0 ? 
                t("desktop.title", {
                    numbersAmount, bonusAmount, bonusName: bonusAmount <= 1 ? bonusName : pluralBonusName
                })
                : t("desktop.titleNoBonus", {
                    numbersAmount
                })
            }}>
            </h4>
            <div className="picker">
                <div className="picker_head">
                    {!done ? (
                        <button className="btn-general btn-green picker_quick-btn" onClick={pickerMethods.quickPick}>
                            {t("desktop.quickPickBtn")}
                        </button>
                    ) : (
                        <div className="picker_done" />
                    )}
                    <button className="picker_clear-btn" onClick={pickerMethods.clearNums} />
                </div>
                <div className="picker_nums">
                    <h5 className="picker_nums_title">{pickerMethods.genNumbersHeader()}</h5>
                    <div className="picker_nums_subwrap">{pickerMethods.generateNumbers()}</div>
                </div>
                {bonusAmount > 0 && (
                    <div className="picker_bonus">
                        <h5 className="picker_nums_title">{pickerMethods.genBonusHeader()}</h5>
                        <div className="picker_bonus_subwrap">{pickerMethods.generateBonusNums()}</div>
                    </div>
                )}
            </div>
        </div>
    );
}

NumberPicker.propTypes = {
    pickedNums: oneOfType([array, object]),
    pickedBonus: oneOfType([array, object]),
    pickerMethods: object.isRequired,
    numbersAmount: number.isRequired,
    bonusAmount: number.isRequired,
    bonusName: string.isRequired,
    pluralBonusName: string.isRequired,
    done: bool,
    t:func.isRequired
}

export default translate("singlePickerText")(NumberPicker);
