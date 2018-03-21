import React, { Component, Fragment } from "react";
import Media from "react-media";

import DynamicHeader from "./components/DynamicHeader/DynamicHeader";
import DynamicMobileHeader from "./components/DynamicHeader/DynamicMobileHeader";
import Help from "./components/Help/Help";
import Fact from "./components/Fact/Fact";
import NumberPicker from "./components/NumberPicker/PickerContainer";
import RegisterForm from "./components/RegisterForm/RegisterForm";

import lottoParamsData from "./tools/lottoParamsData";
import allPickerLottoData from "./components/NumberPicker/pickerLottoData";
import { getFeedData, getParamFromCookieOrUrl, getParamFromURL } from "./tools/toolFunctions";
import sendDataModule from "./tools/sendDataModule";

class App extends Component {
  state = {
	  lotteryOrientation: "Mega Millions",
	  pickerLottoData: null,
      lottoData: null,
      picksData: [
          {
              pickedNums: [],
              pickedBonus: []
          }
      ],
      urlData: {
          bTag: undefined,
          referral: undefined,
          campaign: undefined,
          couponCode: undefined,
          affiliateId: undefined,
          incentiveCode: undefined,
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
              object.LotteryName.toLowerCase() === this.state.urlData.lotteryOrientation
	  )[0];
	  let pickerLottoData = allPickerLottoData[this.state.urlData.lotteryOrientation];
      this.setState({
		  lottoData,
		  pickerLottoData
      });
  };

  setUrlData = () => {
      const bTag = getParamFromCookieOrUrl("btag"),
          campaign = getParamFromCookieOrUrl("campaign"),
          couponCode = getParamFromCookieOrUrl("couponCode"),
          referral = getParamFromCookieOrUrl("referral"),
          mc = getParamFromCookieOrUrl("mc"),
          jlpid = getParamFromCookieOrUrl("jlpid"),
          lotteryOrientation = getParamFromURL("lottery").toLowerCase() || "euromillions",
		  lang = getParamFromURL("lang") || "EN",
          offer = getParamFromURL("offer") || "freeTicket",
		  affiliateId = bTag.length > 0 ? bTag.substring(0, bTag.indexOf("_")) : "",
		  incentiveCode = lottoParamsData[lotteryOrientation.toLowerCase()].incentiveCode || "free_ticket_em";

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
		  incentiveCode,
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
  openModal = () => this.numberPicker.openMobileModal();

  passDataToSendingModule = (formData, errorNode) => {
	  const { lottoData, urlData, picksData, pickerLottoData } = this.state;
	  const {numbersAmount, bonusAmount} = pickerLottoData;

      if (picksData[0].pickedNums.length < numbersAmount || picksData[0].pickedBonus.length < bonusAmount) {
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
	  if(!lottoData) {
		  return(
			  <div></div>
		  )
	  }

	  const lottoName = lottoData.LotteryName.toLowerCase();	  


      return (
          <Fragment>
              <Media query="(min-width: 768px)">
                  {matches =>
                      matches ? (
                          <DynamicHeader
                              lotto={lottoName}
                              jackpot={lottoData.Jackpot.toString()}
                          />
                      ) : (
                          <DynamicMobileHeader
                              lotto={lottoName}
								  jackpot={lottoData.Jackpot.toString()}
								  picksData={picksData}
								  clearHandler={this.clearNumbers}
								  modalOpenHandler={this.openModal}
                          />
                      )
                  }
              </Media>
              <main className="main">
                  <div className="cont-zone">
                      <h1 className="main_title">
              Get your <u>FREE</u> bet line here:
                      </h1>
                      <div className="main_subwrap">
                          <NumberPicker lotto={lottoName} setAppNumbers={this.setNumbers} ref={picker => this.numberPicker = picker} />
                          <RegisterForm submitHandler={this.passDataToSendingModule} />
                      </div>
                  </div>
              </main>
              {lottoData && <Help lotto={lottoName} drawDate={lottoData.DrawDate + " " + lottoData.TimeZone} />}
              <Fact lotto={lottoName} />
          </Fragment>
      );
  }
}

export default App;
