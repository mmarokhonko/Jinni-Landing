import React, { Component } from "react";
import {string, func, object, number} from "prop-types";
import {translate} from "react-i18next";

import headerLottoData from "./headerLottoData";
import pickerLottoData from "../NumberPicker/pickerLottoData";
import {roundDecimal, roundMillions, reverseString} from "./jackpotTools";
import { mobXConnect } from "../../tools/toolFunctions";

class DynamicMobileHeader extends Component {
  state = {
	  lottoData: headerLottoData[this.props.lotto],
	  pickerLottoData: pickerLottoData[this.props.lotto]
  };

  formatJackpot = jackpot => {
      let jackpotReversed = reverseString(jackpot);
      
      const decimalString = jackpotReversed.slice(4,6);
	  const roundedDecimalString = roundDecimal(decimalString);

      if (jackpotReversed.length > 6) {
          const millionsString = jackpotReversed.slice(6);

          if (millionsString.length >= 3 || Number(roundedDecimalString) >= 10 || Number(roundedDecimalString) === 0) {
			  const roundedMillionsString = roundMillions(millionsString, roundedDecimalString);
			  return(`${reverseString(roundedMillionsString)} million`);
          }

          else {
              return `${reverseString(roundedDecimalString.charAt(0) + "." + millionsString)} million`;
          }
      }
      else {
          return `${reverseString(roundedDecimalString.charAt(0) + ".0")} million`;
      }
  }

  formatJackpotString = jackpotString => {
      let reversedJackpotArray = jackpotString.split("").reverse();

      reversedJackpotArray.forEach((symbol, index) => {
          let actualIndex = index + 1;
          if (actualIndex % 3 === 0 && actualIndex !== reversedJackpotArray.length) {
              reversedJackpotArray[index] = `,${symbol}`;
          }
      });
      return reversedJackpotArray.reverse().join("");
  };
  
  generateNumsCircles = pickedNums => {
	  const numCircles = [];
      const {numbersAmount} = this.state.pickerLottoData;	  

	  for(let x = 1; x <= numbersAmount; x++) {
		  const number = pickedNums.length >= x ? pickedNums[x-1] : undefined;
		  const classString = `numbers-widget_circle -num-circle${number ? " -filled" : ""}`;
		  numCircles.push(<div key={x} className={classString}>{number}</div>)
	  }
	  return numCircles;
  }

  generateBonusCircles = pickedBonus => {
	  const numCircles = [];
      const {bonusAmount} = this.state.pickerLottoData;	  	  

      for(let x = 1; x <= bonusAmount; x++) {
          const number = pickedBonus.length >= x ? pickedBonus[x-1] : undefined;
          const classString = `numbers-widget_circle -bonus-circle${number ? " -filled" : ""}`;
          numCircles.push(<div key={x} className={classString}>{number}</div>)
      }
      return numCircles;
  }

  render() {
	  const { lotto, jackpot, modalOpenHandler, numberOfNotFree, t } = this.props;
	  const {ticketsData, clearTicket} = this.props.pickerStore;
      const {lottoData, pickerLottoData} = this.state;
	  const jackpotString = this.formatJackpot(jackpot);

      return (
          <header className="mob-header" style={{ backgroundImage: `url(${lottoData.bgMob})` }}>
              <div className="cont-zone">
                  <img className="mob-header_logo" src={lottoData.logo} alt={lotto} />
				  {numberOfNotFree === 0 ? (
					  <h2 className="mob-header_title" dangerouslySetInnerHTML={{__html: t("freeticketTitle")}}>
                      </h2>
				  ) : (
					  <h2 className="mob-header_title" dangerouslySetInnerHTML={{__html: t("notfreeTitle", 
					  {numberOfTickets:ticketsData.length, numberOfNotFree})}}>
                      </h2>
				  )}
                  <h3 className="mob-header_jackpot">{`${lottoData.currency}${jackpotString}`}</h3>
				  {ticketsData.map((ticket,index) => (
					  <div key={`ticket-widget-${index}`} className={`numbers-widget -theme_${pickerLottoData.ballsTheme}`}>
				  		{this.generateNumsCircles(ticket.pickedNums).map(circle => circle)}
				  		{this.generateBonusCircles(ticket.pickedBonus).map(circle => circle)}
                          <button className="numbers-widget_btn -edit-btn" onClick={() => modalOpenHandler(index)} />
						  {numberOfNotFree === 0 ? <button className="numbers-widget_btn -clear-btn" onClick={() => clearTicket(index)} />
						  : (index+1 > numberOfNotFree ? <p className="numbers-widget_text">{t("freeLabel")}</p> : <p className="numbers-widget_text">{pickerLottoData.price}</p>)}
                      </div>
				  ))}
              </div>
          </header>
      );
  }
}

DynamicMobileHeader.propTypes = {
    lotto: string.isRequired,
    jackpot: string.isRequired,
    modalOpenHandler: func.isRequired,
    pickerStore: object.isRequired,
    numberOfNotFree: number.isRequired
};

export default translate("headerMobileText")(mobXConnect("pickerStore")(DynamicMobileHeader));
