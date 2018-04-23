import React, { Component, Fragment } from "react";
import Media from "react-media";
import { object } from "prop-types";
import axios from "axios";

import DynamicHeader from "./components/DynamicHeader/DynamicHeader";
import DynamicMobileHeader from "./components/DynamicHeader/DynamicMobileHeader";
import Help from "./components/Help/Help";
import Fact from "./components/Fact/Fact";
import NumberPicker from "./components/NumberPicker/PickerContainer";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import Footer from "./components/Footer/Footer";

import MultipleTicketsPicker from "./components/MultipleTicketsPicker/MultiPickerContainer";

import lottoParamsData from "./tools/lottoParamsData";
import allPickerLottoData from "./components/NumberPicker/pickerLottoData";
import {
    getParamFromCookieOrUrl,
    getParamFromURL,
    mobXConnect
} from "./tools/toolFunctions";
import sendDataModule from "./tools/sendDataModule";

class App extends Component {
  state = {
      lotteryOrientation: "megamillions",
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
      },
      numberOfNotFree: null
  };

  componentDidMount() {
      this.setUrlData();

      let feedObject = {};
      axios.get("https://feed.jinnilotto.com/feed.json").then(response => {
          feedObject = response;
          this.selectLottoData(feedObject.data);
      }).catch(error => {
		  console.log("feed.json retrieving error")
          console.log(error);
	  });
  }

  selectLottoData = data => {
      let lottoData = data.filter(
          object => object.LotteryName.toLowerCase() === this.state.urlData.lotteryOrientation
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
          offer = getParamFromURL("offer").toLowerCase() || "freeticket",
          redirectUrl = getParamFromURL("redirectUrl") || "/cart",
          affiliateId = bTag.length > 0 ? bTag.substring(0, bTag.indexOf("_")) : "",
          incentiveCode =
        lottoParamsData[lotteryOrientation.toLowerCase()][`${offer}_incentiveCode`] ||
        "free_ticket_em",
          packageId = lottoParamsData[lotteryOrientation.toLowerCase()][`${offer}_packageId`] || "255";

      this.setNumberOfTicketsInStore(offer);
	  this.setNumberOfNotfreetickets(offer);

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
          packageId,
          redirectUrl,
          referral: referral.length > 0 ? referral : window.location.href
      };

      const newUrlData = Object.assign({}, this.state.urlData, urlData);

      this.setState({
          urlData: newUrlData
      });
  };

  setNumberOfTicketsInStore = offer => {
      const { setNumberOfEmptyTickets } = this.props.pickerStore;
      let number = 1;

      if (offer.indexOf("freeticket") === -1) {
          number = parseInt(offer.substring(0, offer.indexOf("for")));
      }

      setNumberOfEmptyTickets(number);
  };

  setNumberOfNotfreetickets = offer => {
      const { setNumberOfEmptyTickets } = this.props.pickerStore;
      let number = 0;

      if (offer.indexOf("freeticket") === -1) {
          number = parseInt(offer.substring(offer.indexOf("for") + 3));
      }

      this.setState({
          numberOfNotFree: number
      });
  };

  openModal = index => this.numberPicker.wrappedInstance.openMobileModal(index);

  passDataToSendingModule = (formData, errorNode) => {
      const { lottoData, urlData, pickerLottoData } = this.state;
      const { ticketsData } = this.props.pickerStore;
      const { numbersAmount, bonusAmount } = pickerLottoData;

      if (
          this.numberPicker.wrappedInstance.state.hasError &&
      this.numberPicker.wrappedInstance.state.hasEmpty
      ) {
          return;
      }

      let ticketIsNotFilled = false;
      ticketsData.forEach(ticket => {
          if (ticketIsNotFilled) {
              return;
          }
          if (ticket.pickedNums.length < numbersAmount || ticket.pickedBonus.length < bonusAmount) {
              ticketIsNotFilled = true;
          }
      });
      if (ticketIsNotFilled) {
          errorNode.classList.add("-shown");
          errorNode.innerHTML =
        "Whoops! You’ve forgotten the most important part – filling up your bonus tickets";
          return;
      }

      const data = Object.assign(
          {},
          formData,
          {
              lotteryId: lottoData.LotteryID,
              lotteryOrientation: urlData.lotteryOrientation,
              ticketsData
          },
          urlData
      );
      sendDataModule.prepareDataToSend(data, errorNode);
  };

  render() {
      const { lottoData, urlData } = this.state;
      if (!lottoData) {
          return <div>Data not loaded yet</div>;
      }

      const { offer } = urlData;

      const lottoName = lottoData.LotteryName.toLowerCase();

      return (
          <Fragment>
              <Media query="(min-width: 768px)">
                  {matches =>
                      matches ? (
                          <DynamicHeader
							  lotto={lottoName}
                              jackpot={lottoData.Jackpot.toString()}
                              offer={offer}
                              numberOfNotFree={this.state.numberOfNotFree}
                          />
                      ) : (
                          <DynamicMobileHeader
							  lotto={lottoName}
                              jackpot={lottoData.Jackpot.toString()}
                              modalOpenHandler={this.openModal}
                              numberOfNotFree={this.state.numberOfNotFree}
                          />
                      )
                  }
              </Media>
              <main className="main">
                  <div className="cont-zone">
                      {offer === "freeticket" && (
                          <h1 className="main_title">
                Get your <u>FREE</u> bet line here:
                          </h1>
                      )}
                      <div className={`main_subwrap ${offer !== "freeticket" ? "-vertical" : ""}`}>
                          {offer !== "freeticket" ? (
                              <MultipleTicketsPicker
                                  lotto={lottoName}
                                  numberOfNotFree={this.state.numberOfNotFree}
                                  ref={picker => (this.numberPicker = picker)}
                              />
                          ) : (
                              <NumberPicker lotto={lottoName} ref={picker => (this.numberPicker = picker)} />
                          )}
                          <RegisterForm offer={offer} submitHandler={this.passDataToSendingModule} />
                      </div>
                  </div>
              </main>
              <Help
                  offer={offer}
                  numberOfNotFree={this.state.numberOfNotFree}
                  lotto={lottoData.LotteryName}
                  drawDate={lottoData.DrawDate + " " + lottoData.TimeZone}
              />
              <Fact lotto={lottoName} />
			  <Footer offer={offer} />
          </Fragment>
      );
  }
}

App.propTypes = {
    pickerStore: object.isRequired
};

export default mobXConnect("pickerStore")(App);
