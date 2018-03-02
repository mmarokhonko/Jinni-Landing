import React, { Component } from "react";
import PropTypes from "prop-types";

import megaBG from "../../assets/Header/bg/megamillions.png";
import megaPeople from "../../assets/Header/people/megamillions.png";
import megaLogo from "../../assets/Header/logo/megamillions.png";

import symbol1 from "../../assets/Header/jackpot-font/1.png";
import symbol2 from "../../assets/Header/jackpot-font/2.png";
import symbol3 from "../../assets/Header/jackpot-font/3.png";
import symbol4 from "../../assets/Header/jackpot-font/4.png";
import symbol5 from "../../assets/Header/jackpot-font/5.png";
import symbol6 from "../../assets/Header/jackpot-font/6.png";
import symbol7 from "../../assets/Header/jackpot-font/7.png";
import symbol8 from "../../assets/Header/jackpot-font/8.png";
import symbol9 from "../../assets/Header/jackpot-font/9.png";
import symbol0 from "../../assets/Header/jackpot-font/0.png";
import symbolComma from "../../assets/Header/jackpot-font/Comma.png";
import symbolEuro from "../../assets/Header/jackpot-font/Euro.png";

class DynamicHeader extends Component {
  state = {
      lottoData: {
          megamillions: {
              bg: megaBG,
              people: megaPeople,
              logo: megaLogo
          }
      },
      symbols: {
          1: symbol1,
          2: symbol2,
          3: symbol3,
          4: symbol4,
          5: symbol5,
          6: symbol6,
          7: symbol7,
          8: symbol8,
          9: symbol9,
          0: symbol0,
          comma: symbolComma,
          euro: symbolEuro
      }
  };

  constructJackpot = jackpot => {
      const jackpotSymbols = jackpot.split("").reverse();

      const mappedSymbols = jackpotSymbols.map((symbol, index) => {
          let htmlString = "";
          const pos = index + 1;
          if (pos % 3 === 0) {
              htmlString = htmlString.concat(
                  `<img class="header_jackpot_symbol -comma" src="${this.state.symbols["comma"]}" alt=","/>`
              );
          }
          htmlString = htmlString.concat(
              `<img class="header_jackpot_symbol -number" src="${
                  this.state.symbols[symbol]
              }" alt="${symbol}"/>`
          );
          return htmlString;
      });

      mappedSymbols.push(
          `<img class="header_jackpot_symbol -currency" src="${
              this.state.symbols["euro"]
          }" alt="euro"/>`
      );

      return mappedSymbols.reverse().join("");
  };

  render() {
      const { lotto, jackpot } = this.props;
      const lottoData = this.state.lottoData[lotto];

      return (
          <header className="header" style={{ backgroundImage: `url(${lottoData.bg})` }}>
              <img src={lottoData.people} alt="" className="header_people" />
              <div className="cont-zone">
                  <h2 className="header_title -with-logo">
            Play the next <img src={lottoData.logo} alt={lotto} /> draw for FREE
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
