import React from "react";

const pickerDesktop = ({}) => {
    return(
        <div className="frame multi-picker">
            <h4 className="frame_title">
			Pick 5 numbers from 1-70 and <br/>
			1 bonus number from 1-25
            </h4>
            <div className="multi-picker_subwrap">
                <div className="multi-picker_ticket">
                    <button className="btn-general btn-green multi-picker_ticket_quick-btn">Quick pick</button>
                    <div className="multi-picker_ticket_subwrap">
                        <input type="number" max="70" min="1" className="multi-picker_ticket_input -num"/>
                        <input type="number" max="70" min="1" className="multi-picker_ticket_input -num"/>
                        <input type="number" max="70" min="1" className="multi-picker_ticket_input -num"/>
                        <input type="number" max="70" min="1" className="multi-picker_ticket_input -num"/>
						<input type="number" max="70" min="1" className="multi-picker_ticket_input -num"/>
                        <input type="number" max="25" min="1" className="multi-picker_ticket_input -bonus"/>
                    </div>
                    <div className="multi-picker_ticket_price_wrap">
                        <p className="multi-picker_ticket_price -not-free">€3.7</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default pickerDesktop;