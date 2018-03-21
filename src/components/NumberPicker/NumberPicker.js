import React from "react";
import {number, object, array, string} from "prop-types";

const NumberPicker = (props) => {
    const { pickedNums, pickedBonus, pickerMethods, numbersAmount, bonusAmount, bonusName } = props;

    const done = pickedNums.length === numbersAmount && pickedBonus.length === bonusAmount;

    return (
        <div className="frame picker_frame-vert">
            <h4 className="frame_title">
          Pick {numbersAmount} numbers <br />& {bonusAmount} {bonusName}{bonusAmount > 1 ? "s" : ""}
            </h4>
            <div className="picker">
                <div className="picker_head">
                    {!done ? (
                        <button className="btn-general btn-green picker_quick-btn" onClick={pickerMethods.quickPick}>
                Quick Pick
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
                <div className="picker_bonus">
                    <h5 className="picker_nums_title">{pickerMethods.genBonusHeader()}</h5>
                    <div className="picker_bonus_subwrap">{pickerMethods.generateBonusNums()}</div>
                </div>
            </div>
        </div>
    );
}

NumberPicker.propTypes = {
    pickedNums: array,
    pickedBonus: array,
    pickerMethods: object.isRequired,
    numbersAmount: number.isRequired,
    bonusAmount: number.isRequired,
    bonusName: string.isRequired
}

export default NumberPicker;
