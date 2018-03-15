import React, { Component, Fragment } from "react";
import Media from "react-media";

import DynamicHeader from "./components/DynamicHeader/DynamicHeader";
import DynamicMobileHeader from "./components/DynamicHeader/DynamicMobileHeader";
import Help from "./components/Help/Help";
import Fact from "./components/Fact/Fact";
import NumberPicker from "./components/NumberPicker/NumberPicker";
import RegisterForm from "./components/RegisterForm/RegisterForm";

import { getFeedData, getParamFromCookieOrUrl, getParamFromURL } from "./tools/toolFunctions";
import sendDataModule from "./tools/sendDataModule";

class App extends Component {
  state = {
      lotteryOrientation: "Mega Millions",
      lottoData: null,
      picksData: [
          {
              pickedNums: [],
              pickedBonus: null
          }
      ],
      urlData: {
          bTag: undefined,
          referral: undefined,
          campaign: undefined,
          couponCode: undefined,
          affiliateId: undefined,
          incentiveCode: "free_ticket_mm",
          redirectUrl: "https://jinnilotto.com/?init=lp&redirectUrl=/cart "
      }
  };

  async componentDidMount() {
      this.setUrlData();

      const feedObject = await getFeedData();
      this.selectLottoData(feedObject.data);
  }

  selectLottoData = data => {
      let lottoData = data.filter(
          object =>
              object.LotteryName.toLowerCase() === this.state.urlData.lotteryOrientation.toLowerCase()
      )[0];
      this.setState({
          lottoData
      });
  };

  setUrlData = () => {
      const bTag = getParamFromCookieOrUrl("btag"),
          campaign = getParamFromCookieOrUrl("campaign"),
          couponCode = getParamFromCookieOrUrl("couponCode"),
          referral = getParamFromCookieOrUrl("referral"),
          mc = getParamFromCookieOrUrl("mc"),
          jlpid = getParamFromCookieOrUrl("jlpid"),
          lotteryOrientation = getParamFromURL("lottery") || "Mega Millions",
          lang = getParamFromURL("lang") || "EN",
          offer = getParamFromURL("offer") || "freeTicket",
          affiliateId = bTag.length > 0 ? bTag.substring(0, bTag.indexOf("_")) : "";

      const urlData = {
          bTag,
          couponCode,
          campaign,
          affiliateId,
          mc,
          jlpid,
          lotteryOrientation,
          lang,
          offer,
          referral: referral.length > 0 ? referral : window.location.href
      };

      const newUrlData = Object.assign({}, this.state.urlData, urlData);

      this.setState({
          urlData: newUrlData
      });
  };

  setNumbers = numbersData => {
      let { picksData } = this.state;
      picksData[0] = numbersData;

      this.setState({
          picksData
      });
  };

  clearNumbers = () => this.numberPicker.clearNums();

  passDataToSendModule = (formData, errorNode) => {
      const { lottoData, urlData, picksData } = this.state;

      if (picksData[0].pickedNums.length < 5 || !picksData[0].pickedBonus) {
          errorNode.classList.add("-shown");
          errorNode.innerHTML =
        "Whoops! You’ve forgotten the most important part – filling up your bonus tickets";
          return;
      }

      const data = Object.assign(
          {},
          formData,
          { lotteryId: lottoData.LotteryID, lotteryOrientation: urlData.lotteryOrientation, picksData },
          urlData
      );
      sendDataModule.prepareDataToSend(data, errorNode);
  };

  render() {
      const { lottoData, picksData } = this.state;

      return (
          <Fragment>
              {lottoData && (
                  <Media query="(min-width: 768px)">
                      {matches =>
                          matches ? (
                              <DynamicHeader
                                  lotto={lottoData.LotteryName}
                                  jackpot={lottoData.Jackpot.toString()}
                              />
                          ) : (
                              <DynamicMobileHeader
                                  lotto={lottoData.LotteryName}
								  jackpot={lottoData.Jackpot.toString()}
								  picksData={picksData}
								  clearHandler={this.clearNumbers}
                              />
                          )
                      }
                  </Media>
              )}
              <main className="main">
                  <div className="cont-zone">
                      <h1 className="main_title">
              Get your <u>FREE</u> bet line here:
                      </h1>
                      <div className="main_subwrap">
                          <NumberPicker setAppNumbers={this.setNumbers} ref={picker => this.numberPicker = picker} />
                          <RegisterForm submitHandler={this.passDataToSendModule} />
                      </div>
                  </div>
              </main>
              {lottoData && <Help drawDate={lottoData.DrawDate + " " + lottoData.TimeZone} />}
              <Fact />
          </Fragment>
      );
  }
}

export default App;
