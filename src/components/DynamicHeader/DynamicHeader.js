import React, { Component } from "react";
import PropTypes from "prop-types";
import { mobXConnect } from "../../tools/toolFunctions";
import {translate, Trans} from "react-i18next";

import allLottoData from "./headerLottoData";

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
	  const { lotto, jackpot, numberOfNotFree } = this.props;
	  const {ticketsData} = this.props.pickerStore;
      const lottoData = this.state.lottoData;

      this.constructJackpot(jackpot);

      return (
          <header className="header" style={{ backgroundImage: `url(${lottoData.bg})` }}>
              <img src={lottoData.people} alt="" className="header_people" />
              <div className="cont-zone">
			  {numberOfNotFree === 0 ? (
				  <h2 className="header_title -with-logo">
				  <Trans i18nKey="freeticketTitle" lotteryLogo={<img src={lottoData.logo} alt={lotto} />}>
				  	Play the next <img src={lottoData.logo} alt={lotto} /> draw for <span>FREE</span>
				  </Trans>
                      </h2>
			  )  : (
                      <h2 className="header_title -with-logo">
                          <Trans i18nKey="notfreeTitle" numberOfTickets={ticketsData.length} lotteryLogo={<img src={lottoData.logo} alt={lotto} />} numberOfNotFree={numberOfNotFree}>					  
							Get {ticketsData.length} <img src={lottoData.logo} alt={lotto} /> bet lines for the price of {numberOfNotFree}
                          </Trans>
					  </h2>
			  )}
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
    jackpot: PropTypes.string.isRequired,
    pickerStore: PropTypes.object.isRequired,
    numberOfNotFree: PropTypes.number.isRequired
};

export default translate("headerDesktopText")(mobXConnect("pickerStore")(DynamicHeader));
