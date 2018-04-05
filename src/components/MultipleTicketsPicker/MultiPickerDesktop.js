import React from "react";
import {string, number, bool, func, object} from "prop-types";

const MultiPickerDesktop = ({
    ticketsData, 
    numberOfNotFree, 
    pickerMethods, 
    numbersAmount, 
    bonusAmount, 
    maxBonus, 
    minBonus, 
    maxNumber, 
    minNumber, 
    bonusName, 
    ballsTheme, 
    hasError, 
    ballsWrapRef, 
    price}) => {
    return(
        <div className="frame multi-picker">
            <h4 className="frame_title">
			Pick {numbersAmount} numbers from {minNumber}-{maxNumber} and <br/>
                {bonusAmount} {bonusAmount === 1 ? bonusName : `${bonusName}s`} from {minBonus}-{maxBonus}
            </h4>
            <div className="multi-picker_subwrap" ref={ballsWrapRef}>
                {ticketsData.map((ticket, index) => {
                    return(<div className="multi-picker_ticket" key={index}>
                        <button 
                            className="btn-general btn-green multi-picker_ticket_quick-btn"
                            onClick={() => pickerMethods.quickPick(index)}
                        >Quick pick</button>
                        <div className={`multi-picker_ticket_subwrap -theme_${ballsTheme}`}>
                            {pickerMethods.generateNumbers(index)}
                            {pickerMethods.generateBonuses(index)}
                        </div>
                        {index+1 <= numberOfNotFree ? (
                            <div className="multi-picker_ticket_price_wrap">
                                <p className="multi-picker_ticket_price -not-free">{price}</p>
                            </div>
                        ) : (
                            <div className="multi-picker_ticket_price_wrap">
                                <p className="multi-picker_ticket_price">FREE</p>
                            </div>
                        )}
                    </div>)
                })}
            </div>
            {hasError && <p className="multi-picker_error-text">
			Oops! Looks like at least one of you numbers is not valid or a double! Please, choose another number.</p>}
        </div>
    )
}

MultiPickerDesktop.propTypes = {
    ticketsData: object.isRequired,
    numberOfNotFree: number.isRequired,
    pickerMethods: object.isRequired,
    numbersAmount: number.isRequired,
    bonusAmount: number.isRequired,
    maxBonus: number.isRequired,
    minBonus: number.isRequired,
    maxNumber: number.isRequired,
    minNumber: number.isRequired,
    bonusName: string.isRequired,
    ballsTheme: string.isRequired,
    price: string.isRequired,
    hasError: bool.isRequired,
    ballsWrapRef: func.isRequired
}

export default MultiPickerDesktop;