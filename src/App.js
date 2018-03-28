import React, { Component, Fragment } from "react";
import Media from "react-media";
import DevTools from "mobx-react-devtools";

import DynamicHeader from "./components/DynamicHeader/DynamicHeader";
import DynamicMobileHeader from "./components/DynamicHeader/DynamicMobileHeader";
import Help from "./components/Help/Help";
import Fact from "./components/Fact/Fact";
import NumberPicker from "./components/NumberPicker/PickerContainer";
import RegisterForm from "./components/RegisterForm/RegisterForm";

import MultipleTicketsPicker from "./components/MultipleTicketsPicker/MultiPickerContainer";

import lottoParamsData from "./tools/lottoParamsData";
import allPickerLottoData from "./components/NumberPicker/pickerLottoData";
import { getFeedData, getParamFromCookieOrUrl, getParamFromURL, mobXConnect } from "./tools/toolFunctions";
import sendDataModule from "./tools/sendDataModule";

class App extends Component {
  state = {
	  lotteryOrientation: "Mega Millions",
	  pickerLottoData: null,
      lottoData: null,
      urlData: {
          bTag: undefined,
          referral: undefined,
          campaign: undefined,
          couponCode: undefined,
          affiliateId: undefined,
          incentiveCode: undefined,
          redirectUrl: "/cart"
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
		  offer = getParamFromURL("offer") || "4to1",
		  redirectUrl= getParamFromURL("redirectUrl") || "/cart",
		  affiliateId = bTag.length > 0 ? bTag.substring(0, bTag.indexOf("_")) : "",
		  incentiveCode = lottoParamsData[lotteryOrientation.toLowerCase()].incentiveCode || "free_ticket_em";

		  this.setNumberOfTicketsInStore(offer);
		  this.setNumberOfNotFreeTickets(offer);

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
		  redirectUrl,
          referral: referral.length > 0 ? referral : window.location.href
      };

      const newUrlData = Object.assign({}, this.state.urlData, urlData);

      this.setState({
          urlData: newUrlData
      });
  };

  setNumberOfTicketsInStore = offer => {
	  const {setNumberOfEmptyTickets} = this.props.pickerStore;
	  let number = 1;
	
	  if(offer !== "freeTicket") {
          number = parseInt(offer.substring(0, offer.indexOf("to")));		
	  }

	  setNumberOfEmptyTickets(number);
  }

  setNumberOfNotFreeTickets = offer => {
      const {setNumberOfEmptyTickets} = this.props.pickerStore;
      let number = 0;
  
      if(offer !== "freeTicket") {
          number = parseInt(offer.substring(offer.indexOf("to")+2));		
      }

      this.setState({
		  numberOfNotFree: number
	  })
  }

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
	  const { lottoData, picksData, urlData } = this.state;
	  if(!lottoData) {
		  return(
			  <div></div>
		  )
	  }

	  const {offer} = urlData;

	  const lottoName = lottoData.LotteryName.toLowerCase();	  


      return (
          <Fragment>
			  <DevTools />
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
                      <div className={`main_subwrap ${offer !== "freeTicket" ? "-vertical" : ""}`}>
						  {offer !== "freeTicket" 
						  ? <MultipleTicketsPicker lotto={lottoName} numberOfNotFree={this.state.numberOfNotFree} />
                              : <NumberPicker lotto={lottoName} ref={picker => this.numberPicker = picker} />
                          }
                          <RegisterForm submitHandler={this.passDataToSendingModule} />
                      </div>
                  </div>
              </main>
              {lottoData && <Help lotto={lottoData.LotteryName} drawDate={lottoData.DrawDate + " " + lottoData.TimeZone} />}
              <Fact lotto={lottoName} />
          </Fragment>
      );
  }
}

export default mobXConnect("pickerStore")(App);
