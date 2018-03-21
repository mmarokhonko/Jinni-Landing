import React, { Component } from "react";
import shallowEqualArrays from "shallow-equal/arrays";
import { string, func } from "prop-types";
import Media from "react-media";
import noScroll from "no-scroll";

import lottoData from "./pickerLottoData";
import NumberPicker from "./NumberPicker";
import NumberPickerMobile from "./NumberPickerMobile";

class PickerContainer extends Component {
  state = {
      maxNumber: lottoData[this.props.lotto].maxNumber,
	  maxBonus: lottoData[this.props.lotto].maxBonus,
	  numbersAmount: lottoData[this.props.lotto].numbersAmount,
	  bonusAmount: lottoData[this.props.lotto].bonusAmount,
	  bonusName: lottoData[this.props.lotto].bonusName,
	  ballsTheme: lottoData[this.props.lotto].ballsTheme,
	  includeZeroBonusNumber: lottoData[this.props.lotto].includeZeroBonusNumber,	  
      pickedNums: [],
      pickedBonus: [],
	  quickPickDelay: 150,
	  isMobileModalOpen: false
  };

  componentDidMount() {
      this.sendActualNumbersUpwards();
  }

  shouldComponentUpdate(nextProps, nextState) {
	  const { pickedNums, pickedBonus, isMobileModalOpen } = this.state;
	  
      if (
          !shallowEqualArrays(pickedNums, nextState.pickedNums) ||
      pickedBonus !== nextState.pickedBonus
      ) {
          return true;
	  }
	  
	  if(isMobileModalOpen !== nextState.isMobileModalOpen) {
		  return true
	  }

      return false;
  }

  componentDidUpdate() {
      this.sendActualNumbersUpwards();
  }

  sendActualNumbersUpwards = () => {
      const { pickedNums, pickedBonus } = this.state;
      const numbersData = {
          pickedNums,
          pickedBonus
      };
      this.props.setAppNumbers(numbersData);
  };

  toggleNum = num => {
	  const {numbersAmount} = this.state;
      let pickedNums = this.state.pickedNums.slice();
      if (pickedNums.indexOf(num) !== -1) {
          pickedNums = pickedNums.filter(item => item !== num);
          this.setState({
              pickedNums
          });
          return;
      }

      if (pickedNums.length === numbersAmount) {
          return;
      }

      pickedNums.push(num);
      this.setState({
          pickedNums
      });
  };

  toggleBonus = bonus => {
      const {bonusAmount} = this.state;
      let pickedBonus = this.state.pickedBonus.slice();
      if (pickedBonus.indexOf(bonus) !== -1) {
          pickedBonus = pickedBonus.filter(item => item !== bonus);
          this.setState({
              pickedBonus
          });
          return;
      }

      if (pickedBonus.length === bonusAmount) {
          return;
      }

      pickedBonus.push(bonus);
      this.setState({
          pickedBonus
      });
  };

  clearNums = () => {
      this.setState({
          pickedNums: [],
          pickedBonus: []
      });
  };

  genNumbersHeader = () => {
      const {numbersAmount} = this.state;	  
      if (this.state.pickedNums.length === numbersAmount) {
          return "Line completed";
      } else {
          const diff = numbersAmount - this.state.pickedNums.length;
          if (diff === 1) {
              return "Select 1 number";
          }
          return `Select ${diff} numbers`;
      }
  };

  genNumbersMobileHeader = () => {
	  const numCircles = [];
	  const {numbersAmount, bonusAmount} = this.state;
  
      for(let x = 0; x <= numbersAmount - 1; x++) {
          const number = this.state.pickedNums[x];
          const classString = `picker-mob_nums_head_circle -num-circle${number ? " -filled" : ""}`;
          numCircles.push(<div key={`n-${x}`} className={classString}>{number}</div>)
      }
  
      const bonusCircles = [];
  
      for(let x = 0; x <=bonusAmount - 1; x++) {
		  const number = this.state.pickedBonus[x];
          const classString = `picker-mob_nums_head_circle -bonus-circle${number ? " -filled" : ""}`;
          bonusCircles.push(<div key={`b-${x}`} className={classString}>{number}</div>)
	  }
	  
	  return numCircles.concat(bonusCircles);
  };

  genBonusHeader = () => {
	  const {bonusAmount, pickedBonus, bonusName} = this.state;
	  
      if (pickedBonus.length === bonusAmount) {
          return "All done here!";
      } else {
          const diff = bonusAmount - pickedBonus.length;
          if (diff === 1) {
              return `Select 1 ${bonusName}`;
          }
          return `Select ${diff} ${bonusName}s!`;
      }	
  };

  genRandomNumber = () => {
      const {numbersAmount} = this.state;	  
      let { maxNumber, quickPickDelay } = this.state;
      let pickedNums = this.state.pickedNums.slice();

      if (pickedNums.length !== numbersAmount) {
          let ranNumber = Math.floor(Math.random() * maxNumber) + 1;
          if (pickedNums.indexOf(ranNumber) !== -1) {
              return this.genRandomNumber();
          } else {
              pickedNums.push(ranNumber);
              this.setState(
                  {
                      pickedNums
                  },
                  () => {
                      setTimeout(() => {
                          this.state.pickedNums.length === numbersAmount ? this.genRandomBonus() : this.genRandomNumber();
                      }, quickPickDelay);
                  }
              );
          }
      }
  };

  genRandomBonus = () => {
      let { maxBonus, pickedBonus, bonusAmount, quickPickDelay, includeZeroBonusNumber } = this.state;
      let pickedBonuses = pickedBonus.slice();
	  let startingBonusNumber = includeZeroBonusNumber ? 0 : 1;	

      if (pickedBonuses.length !== bonusAmount) {
          let ranBonus = Math.floor(Math.random() * maxBonus) + startingBonusNumber;
          if (pickedBonuses.indexOf(ranBonus) !== -1) {
              return this.genRandomBonus();
          } else {
              pickedBonuses.push(ranBonus);
              this.setState(
                  {
                      pickedBonus: pickedBonuses
                  },
                  () => {
                      setTimeout(() => {
                          this.state.pickedNums.length === bonusAmount ? true : this.genRandomBonus();
                      }, quickPickDelay);
                  }
              );
          }
      }	
  };

  quickPick = () => {
      this.setState(
          {
              pickedNums: [],
              pickedBonus: []
          },
          () => {
              this.genRandomNumber();
          }
      );
  };

  generateNumbers = maxNumber => {
      let nums = [];
      const pickedNums = this.state.pickedNums;
      for (let num = 1; num <= maxNumber; num++) {
          const picked = pickedNums.indexOf(num) !== -1;
          const numHtml = (
              <div
                  key={num}
                  className={`picker_nums_num ${picked ? "-picked" : ""}`}
                  onClick={() => this.toggleNum(num)}
              >
                  {num}
              </div>
          );
          nums.push(numHtml);
      }
      return nums;
  };

  generateBonusNums = maxBonus => {
      let { includeZeroBonusNumber } = this.state;
	  let bonuses = [];
	  let startingBonusNumber = includeZeroBonusNumber ? 0 : 1;		  
      const pickedBonus = this.state.pickedBonus;
      for (let bonus = startingBonusNumber; bonus <= maxBonus; bonus++) {
          const picked = pickedBonus.indexOf(bonus) !== -1;
          const numHtml = (
              <div
                  key={bonus}
                  className={`picker_bonus_num ${picked ? "-picked" : ""}`}
                  onClick={() => this.toggleBonus(bonus)}
              >
                  {bonus}
              </div>
          );
          bonuses.push(numHtml);
      }
      return bonuses;
  };

  openMobileModal = () => {
	  noScroll.on();
	  this.setState({
          isMobileModalOpen: true
	  })
  };

  closeMobileModal = () => {
	  noScroll.off();
	  this.setState({
          isMobileModalOpen: false
	  })
  }

  pickerMethods = {
      quickPick: this.quickPick,
      clearNums: this.clearNums,
      genNumbersHeader: this.genNumbersHeader,
      generateNumbers: () => this.generateNumbers(this.state.maxNumber),
      genBonusHeader: this.genBonusHeader,
      generateBonusNums: () => this.generateBonusNums(this.state.maxBonus)
  };

  pickerMobileMethods = {
      genNumbersMobileHeader: this.genNumbersMobileHeader,
      openMobileModal: this.openMobileModal,
      closeMobileModal: this.closeMobileModal	
  }

  render() {
      return (
          <Media query="(min-width: 768px)">
              {matcher =>
                  matcher ? (
                      <NumberPicker
                          pickerMethods={this.pickerMethods}
                          pickedNums={this.state.pickedNums}
						  pickedBonus={this.state.pickedBonus}
						  numbersAmount={this.state.numbersAmount}
						  bonusAmount={this.state.bonusAmount}
						  bonusName={this.state.bonusName}
                      />
                  ) : (
                      <NumberPickerMobile
                          pickerMethods={this.pickerMethods}
                          pickerMobileMethods={this.pickerMobileMethods}
                          pickedNums={this.state.pickedNums}
						  pickedBonus={this.state.pickedBonus}
						  numbersAmount={this.state.numbersAmount}
						  bonusAmount={this.state.bonusAmount}
						  maxNumber={this.state.maxNumber}						  						  
						  maxBonus={this.state.maxBonus}
						  ballsTheme={this.state.ballsTheme}
						  modalOpen={this.state.isMobileModalOpen}
                      />
                  )
              }
          </Media>
      );
  }
}

PickerContainer.propTypes = {
    setAppNumbers: func.isRequired,
    lotto: string.isRequired
};

export default PickerContainer;
