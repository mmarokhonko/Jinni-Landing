import React, { Component } from "react";
import {number, object, array} from "prop-types";

const NumberPicker = (props) => {
    const { pickedNums, pickedBonus, pickerMethods } = props;

    const done = pickedNums.length === 5 && pickedBonus ? true : false;

    return (
        <div className="frame picker_frame-vert">
            <h4 className="frame_title">
          Pick 5 numbers <br />& 1 bonus number
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
    pickedBonus: number,
    pickerMethods: object.isRequired
}

export default NumberPicker;
