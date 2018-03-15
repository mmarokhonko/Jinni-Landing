import React, { Component } from "react";
import PropTypes from "prop-types";

import megaBG from "../../assets/Header/mob-bg/megamillions.png";
import megaLogo from "../../assets/Header/logo/megamillions.png";

class DynamicMobileHeader extends Component {
  state = {
      lottoData: {
          ["Mega Millions"]: {
              bg: megaBG,
			  logo: megaLogo,
			  currency: "$"
          }
      }
  };

  formatJackpotString = (jackpotString) => {
	  let reversedJackpotArray = jackpotString.split("").reverse();
	  
	  reversedJackpotArray.forEach((symbol, index) => {
		  let actualIndex = index + 1;
		  if(actualIndex % 3 === 0 && actualIndex !== reversedJackpotArray.length) {
              reversedJackpotArray[index] = `,${symbol}`;
		  }
	  });
	  return reversedJackpotArray.reverse().join("");	  
  }

  render() {
      const { lotto, jackpot } = this.props;
	  const lottoData = this.state.lottoData[lotto];
	  const jackpotString = this.formatJackpotString(jackpot);

      return (
          <header className="mob-header" style={{ backgroundImage: `url(${lottoData.bg})` }}>
              <div className="cont-zone">
                  <img className="mob-header_logo" src={lottoData.logo} alt={lotto} />
                  <h2 className="mob-header_title">
            Play the next draw for <span>FREE</span>
                  </h2>
                  <h3 className="mob-header_jackpot">{`${lottoData.currency}${jackpotString}`}</h3>
              </div>
          </header>
      );
  }
}

DynamicMobileHeader.propTypes = {
    lotto: PropTypes.string.isRequired,
    jackpot: PropTypes.string.isRequired
};

export default DynamicMobileHeader;
