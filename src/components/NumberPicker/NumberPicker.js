import React from "react";
import {number, object, array, string, bool, oneOfType} from "prop-types";

const NumberPicker = (props) => {
    const { pickedNums, pickedBonus, pickerMethods, numbersAmount, bonusAmount, bonusName, done } = props;
	
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
    pickedNums: oneOfType([array, object]),
    pickedBonus: oneOfType([array, object]),
    pickerMethods: object.isRequired,
    numbersAmount: number.isRequired,
    bonusAmount: number.isRequired,
    bonusName: string.isRequired,
    done: bool
}

export default NumberPicker;
