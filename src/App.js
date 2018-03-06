import React, { Component, Fragment } from "react";

import DynamicHeader from "./components/DynamicHeader/DynamicHeader";
import Help from "./components/Help/Help";
import Fact from "./components/Fact/Fact";
import NumberPicker from "./components/NumberPicker/NumberPicker";
import RegisterForm from "./components/RegisterForm/RegisterForm";

import { getQueryStringValue, getFeedData, setBTagCookie } from "./tools/toolFunctions";
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
          redirectUrl: "https://jinnilotto.com/cart",
          mc: "",
          jlpd: ""
      }
  };

  async componentDidMount() {
      this.setUrlData();

      const feedObject = await getFeedData();
      this.selectLottoData(feedObject.data);
  }

  selectLottoData = data => {
      let lottoData = data.filter(object => object.LotteryName === this.state.lotteryOrientation)[0];
      this.setState({
          lottoData
      });
  };

  setUrlData = () => {
      const bTag = getQueryStringValue("bTag");
      const campaign = getQueryStringValue("campaign");
      const couponCode = getQueryStringValue("couponCode");
      const referral = window.location.href;
      const affiliateId = bTag ? bTag.substring(0, bTag.indexOf("_")) : "";	
			
      const actualBTag = setBTagCookie(bTag);
									
      const urlData = {
          bTag: actualBTag, couponCode, referral, campaign, affiliateId
      }
			
      const newUrlData = Object.assign({}, this.state.urlData, urlData)

      this.setState({
          urlData: newUrlData
      })

  };

  setNumbers = numbersData => {
      let {picksData} = this.state;
      picksData[0] = numbersData;

      this.setState({
          picksData
      });
  };
	
  passDataToSendModule = formData => {
      const {lottoData, urlData, lotteryOrientation, picksData} = this.state;
			
      if(picksData[0].pickedNums.length < 5 || !picksData[0].pickedBonus) {
          return alert("Pick numbers!")
      }


      const data = Object.assign({},
          formData, 
          {lotteryId:lottoData.LotteryID, lotteryOrientation: "MegaMillions", picksData}, 
          urlData);
      sendDataModule.prepareDataToSend(data);
  }

  render() {
      const { lottoData } = this.state;

      return (
          <Fragment>
              {lottoData && (
                  <DynamicHeader lotto={lottoData.LotteryName} jackpot={lottoData.Jackpot.toString()} />
              )}
              <main className="main">
                  <div className="cont-zone">
                      <h1 className="main_title">
              Get your <u>FREE</u> bet line here:
                      </h1>
                      <div className="main_subwrap">
                          <NumberPicker setAppNumbers={this.setNumbers} />
                          <RegisterForm submitHandler={this.passDataToSendModule}/>
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
