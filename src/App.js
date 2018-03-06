import React, { Component, Fragment } from "react";

import DynamicHeader from "./components/DynamicHeader/DynamicHeader";
import Help from "./components/Help/Help";
import Fact from "./components/Fact/Fact";
import NumberPicker from "./components/NumberPicker/NumberPicker";
import RegisterForm from "./components/RegisterForm/RegisterForm";

import { setBTagCookie } from "./tools/cookiesFunctions";
import { getQueryStringValue, getFeedData } from "./tools/otherFunctions";

class App extends Component {
  state = {
      lotteryOrientation: "Mega Millions",
      lottoData: null
  };

  async componentDidMount() {
      const bTag = getQueryStringValue("bTag");
      if (bTag.length > 0) {
          setBTagCookie(bTag);
      }

      const feedObject = await getFeedData();
      this.selectLottoData(feedObject.data);
  }

  selectLottoData = data => {
      let lottoData = data.filter(object => object.LotteryName === this.state.lotteryOrientation)[0];
      this.setState({
          lottoData
      });
  };

  render() {
      const { lottoData } = this.state;

      return (
          <Fragment>
              {lottoData && <DynamicHeader lotto={lottoData.LotteryName} jackpot={lottoData.Jackpot.toString()} />}
              <main className="main">
                  <div className="cont-zone">
                      <h1 className="main_title">
              Get your <u>FREE</u> bet line here:
                      </h1>
                      <div className="main_subwrap">
                          <NumberPicker />
                          <RegisterForm />
                      </div>
                  </div>
              </main>
              {lottoData && <Help drawDate={lottoData.DrawDate + " " + lottoData.TimeZone}/>}
              <Fact />
          </Fragment>
      );
  }
}

export default App;
