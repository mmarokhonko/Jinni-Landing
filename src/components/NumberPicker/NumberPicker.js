import React, { Component } from "react";
import shallowEqualArrays from "shallow-equal/arrays";
import {func} from "prop-types";

class NumberPicker extends Component {
  state = {
      maxNumber: 70,
      maxBonus: 25,
      pickedNums: [],
      pickedBonus: null,
      quickPickDelay: 150
  };

  componentDidMount() {
      this.sendActualNumbersUpwards();
  }

  shouldComponentUpdate(nextProps, nextState) {
      const { pickedNums, pickedBonus } = this.state;
      if (
          !shallowEqualArrays(pickedNums, nextState.pickedNums) ||
      pickedBonus !== nextState.pickedBonus
      ) {
          return true;
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

  toogleNum = num => {
      let pickedNums = this.state.pickedNums.slice();
      if (pickedNums.indexOf(num) !== -1) {
          pickedNums = pickedNums.filter(item => item !== num);
          this.setState({
              pickedNums
          });
          return;
      }

      if (pickedNums.length === 5) {
          return;
      }

      pickedNums.push(num);
      this.setState({
          pickedNums
      });
  };

  toogleBonus = bonus => {
      let pickedBonus = this.state.pickedBonus;
      if (pickedBonus === bonus) {
          pickedBonus = null;
          this.setState({
              pickedBonus
          });
          return;
      }

      pickedBonus = bonus;
      this.setState({
          pickedBonus
      });
  };

  clearNums = () => {
      this.setState({
          pickedNums: [],
          pickedBonus: null
      });
  };

  genNumbersHeader = () => {
      if (this.state.pickedNums.length === 5) {
          return "Line completed";
      } else {
          const diff = 5 - this.state.pickedNums.length;
          if (diff === 1) {
              return "Select 1 number";
          }
          return `Select ${diff} numbers`;
      }
  };

  genBonusHeader = () => {
      if (this.state.pickedBonus) {
          return "All done here!";
      }
      return "Select 1 number";
  };

  genRandomNumber = () => {
      let { maxNumber, quickPickDelay } = this.state;
      let pickedNums = this.state.pickedNums.slice();

      if (pickedNums.length !== 5) {
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
                          this.state.pickedNums.length === 5 ? this.genRandomBonus() : this.genRandomNumber();
                      }, quickPickDelay);
                  }
              );
          }
      }
  };

  genRandomBonus = () => {
      let { maxBonus, pickedBonus } = this.state;
      if (!pickedBonus) {
          let ranBonus = Math.floor(Math.random() * maxBonus) + 1;
          if (pickedBonus === ranBonus) {
              return this.genRandomBonus();
          } else {
              pickedBonus = ranBonus;
              this.setState({
                  pickedBonus
              });
          }
      }
  };

  quickPick = () => {
      this.setState(
          {
              pickedNums: [],
              pickedBonus: null
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
                  onClick={() => this.toogleNum(num)}
              >
                  {num}
              </div>
          );
          nums.push(numHtml);
      }
      return nums;
  };

  generateBonusNums = maxBonus => {
      let bonuses = [];
      const pickedBonus = this.state.pickedBonus;
      for (let bonus = 1; bonus <= maxBonus; bonus++) {
          const picked = pickedBonus === bonus;
          const numHtml = (
              <div
                  key={bonus}
                  className={`picker_bonus_num ${picked ? "-picked" : ""}`}
                  onClick={() => this.toogleBonus(bonus)}
              >
                  {bonus}
              </div>
          );
          bonuses.push(numHtml);
      }
      return bonuses;
  };

  render() {
      const { maxNumber, maxBonus, pickedNums, pickedBonus } = this.state;

      const done = pickedNums.length === 5 && pickedBonus ? true : false;

      return (
          <div className="frame picker_frame-vert">
              <h4 className="frame_title">
          Pick 5 numbers <br />& 1 bonus number
              </h4>
              <div className="picker">
                  <div className="picker_head">
                      {!done ? (
                          <button className="btn-general btn-green picker_quick-btn" onClick={this.quickPick}>
                Quick Pick
                          </button>
                      ) : (
                          <div className="picker_done" />
                      )}
                      <button className="picker_clear-btn" onClick={this.clearNums} />
                  </div>
                  <div className="picker_nums">
                      <h5 className="picker_nums_title">{this.genNumbersHeader()}</h5>
                      <div className="picker_nums_subwrap">{this.generateNumbers(maxNumber)}</div>
                  </div>
                  <div className="picker_bonus">
                      <h5 className="picker_nums_title">{this.genBonusHeader()}</h5>
                      <div className="picker_bonus_subwrap">{this.generateBonusNums(maxBonus)}</div>
                  </div>
              </div>
          </div>
      );
  }
}

NumberPicker.propTypes = {
    setAppNumbers: func.isRequired
}

export default NumberPicker;
