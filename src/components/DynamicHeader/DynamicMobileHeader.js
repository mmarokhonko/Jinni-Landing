import React, { Component } from "react";
import {string, array, func} from "prop-types";

import allLottoData from "./allLottoData";

class DynamicMobileHeader extends Component {
  state = {
      lottoData: allLottoData[this.props.lotto]
  };

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

	  for(let x = 0; x <=4; x++) {
		  const number = pickedNums[x];
		  const classString = `numbers-widget_circle -num-circle${number ? " -filled" : ""}`;
		  numCircles.push(<div key={x} className={classString}>{number}</div>)
	  }
	  return numCircles;
  }

  generateBonusCircles = pickedBonus => {
      const numCircles = [];

      for(let x = 0; x <=0; x++) {
          const number = pickedBonus;
          const classString = `numbers-widget_circle -bonus-circle${number ? " -filled" : ""}`;
          numCircles.push(<div key={x} className={classString}>{number}</div>)
      }
      return numCircles;
  }

  render() {
      const { lotto, jackpot, picksData, clearHandler } = this.props;
      const lottoData = this.state.lottoData;
	  const jackpotString = this.formatJackpotString(jackpot);
	  
	  const pickedNumbers = picksData[0].pickedNums;
	  const pickedBonus = picksData[0].pickedBonus;

      return (
          <header className="mob-header" style={{ backgroundImage: `url(${lottoData.bgMob})` }}>
              <div className="cont-zone">
                  <img className="mob-header_logo" src={lottoData.logo} alt={lotto} />
                  <h2 className="mob-header_title">
            Play the next draw for <span>FREE</span>
                  </h2>
                  <h3 className="mob-header_jackpot">{`${lottoData.currency}${jackpotString}`}</h3>
                  <div className="numbers-widget">
				  	{this.generateNumsCircles(pickedNumbers).map(circle => circle)}
				  	{this.generateBonusCircles(pickedBonus).map(circle => circle)}
                      <button className="numbers-widget_btn -edit-btn" />
                      <button className="numbers-widget_btn -clear-btn" onClick={clearHandler} />
                  </div>
              </div>
          </header>
      );
  }
}

DynamicMobileHeader.propTypes = {
    lotto: string.isRequired,
    jackpot: string.isRequired,
    picksData: array.isRequired,
    clearHandler: func.isRequired
};

export default DynamicMobileHeader;
