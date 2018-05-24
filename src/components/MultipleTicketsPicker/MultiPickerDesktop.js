import React from "react";
import {string, number, bool, func, object} from "prop-types";
import {translate} from "react-i18next";

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
    pluralBonusName, 
    ballsTheme, 
    hasError, 
    ballsWrapRef, 
    price,
    t}) => {
    return(
        <div className="frame multi-picker">
            <h4 className="frame_title" dangerouslySetInnerHTML={{__html: t("title", 
                {numbersAmount, minNumber, maxNumber, bonusAmount, bonusName: bonusAmount <= 1 ? bonusName : pluralBonusName, minBonus, maxBonus})}}> 
            </h4>
            <div className="multi-picker_subwrap" ref={ballsWrapRef}>
                {ticketsData.map((ticket, index) => {
                    return(<div className="multi-picker_ticket" key={index}>
                        <button 
                            className="btn-general btn-green multi-picker_ticket_quick-btn"
                            onClick={() => pickerMethods.quickPick(index)}
                        >{t("quickPickBtn")}</button>
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
                                <p className="multi-picker_ticket_price">{t("freeLabel")}</p>
                            </div>
                        )}
                    </div>)
                })}
            </div>
            {hasError && <p className="multi-picker_error-text">
                {t("errorText")}</p>}
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
	pluralBonusName: string.isRequired,
    ballsTheme: string.isRequired,
    price: string.isRequired,
    hasError: bool.isRequired,
    ballsWrapRef: func.isRequired,
    t:func.isRequired
}

export default translate("multiPickerText")(MultiPickerDesktop);