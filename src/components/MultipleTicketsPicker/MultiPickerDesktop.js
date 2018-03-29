import React, {Component} from "react";

class MultiPickerDesktop extends Component {
    render(){
        const {ticketsData, numberOfNotFree, pickerMethods, numbersAmount, 
            bonusAmount, maxBonus, minBonus, maxNumber, minNumber, bonusName, ballsTheme, hasError, ballsWrapRef} = this.props;
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
                                    <p className="multi-picker_ticket_price -not-free">€3.7</p>
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
}

export default MultiPickerDesktop;