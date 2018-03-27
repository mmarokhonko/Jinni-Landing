import React from "react";

const MultiPickerDesktop = ({ticketsData, numberOfNotFree, pickerMethods}) => {
    return(
        <div className="frame multi-picker">
            <h4 className="frame_title">
			Pick 5 numbers from 1-70 and <br/>
			1 bonus number from 1-25
            </h4>
            <div className="multi-picker_subwrap">
                {ticketsData.map((ticket, index) => {
                    return(<div className="multi-picker_ticket" key={index}>
                        <button 
                            className="btn-general btn-green multi-picker_ticket_quick-btn"
                            onClick={() => pickerMethods.quickPick(index)}
                        >Quick pick</button>
                        <div className="multi-picker_ticket_subwrap">
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
        </div>
    )
}

export default MultiPickerDesktop;