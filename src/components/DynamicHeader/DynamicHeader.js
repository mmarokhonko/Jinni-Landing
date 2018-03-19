import React, { Component } from "react";
import PropTypes from "prop-types";

import allLottoData from "./allLottoData";

import {roundDecimal, roundMillions, reverseString, mapStringToImages} from "./jackpotTools";

class DynamicHeader extends Component {
  state = {
      lottoData: allLottoData[this.props.lotto]
  };

  constructJackpot = jackpot => {
      let jackpotReversed = reverseString(jackpot);
      
      const decimalString = jackpotReversed.slice(4,6);
      const roundedDecimalString = roundDecimal(decimalString);

      if (jackpotReversed.length > 6) {
          const millionsString = jackpotReversed.slice(6);

          if (millionsString.length >= 3 || Number(roundedDecimalString) >= 10 || Number(roundedDecimalString) === 0) {
              const roundedMillionsString = roundMillions(millionsString, roundedDecimalString);
              return mapStringToImages(roundedMillionsString);  
          }

          else {
              return mapStringToImages(roundedDecimalString.charAt(0) + "." + millionsString);
          }
      }
      else {
          return mapStringToImages(roundedDecimalString.charAt(0) + ".0");
      }
  };


  render() {
      const { lotto, jackpot } = this.props;
      const lottoData = this.state.lottoData;

      this.constructJackpot(jackpot);

      return (
          <header className="header" style={{ backgroundImage: `url(${lottoData.bg})` }}>
              <img src={lottoData.people} alt="" className="header_people" />
              <div className="cont-zone">
                  <h2 className="header_title -with-logo">
            Play the next <img src={lottoData.logo} alt={lotto} /> draw for <span>FREE</span>
                  </h2>
                  <div
                      className="header_jackpot"
                      dangerouslySetInnerHTML={{ __html: this.constructJackpot(jackpot) }}
                  />
              </div>
          </header>
      );
  }
}

DynamicHeader.propTypes = {
    lotto: PropTypes.string.isRequired,
    jackpot: PropTypes.string.isRequired
};

export default DynamicHeader;
