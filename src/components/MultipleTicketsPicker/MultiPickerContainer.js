import React, { Component } from "react";
import Media from "react-media";
import noScroll from "no-scroll";

import MultiPickerDesktop from "./MultiPickerDesktop";
import MultiPickerMobile from "./MultiPickerMobile";
import lottoData from "../NumberPicker/pickerLottoData";
import { mobXConnect } from "../../tools/toolFunctions";

class MultipleTicketsPickerContainer extends Component {
  state = {
      minNumber: lottoData[this.props.lotto].minNumber,
      minBonus: lottoData[this.props.lotto].minBonus,
      maxNumber: lottoData[this.props.lotto].maxNumber,
      maxBonus: lottoData[this.props.lotto].maxBonus,
      numbersAmount: lottoData[this.props.lotto].numbersAmount,
      bonusAmount: lottoData[this.props.lotto].bonusAmount,
      bonusName: lottoData[this.props.lotto].bonusName,
      ballsTheme: lottoData[this.props.lotto].ballsTheme,
      quickPickDelay: 150,
      numberOfNotFree: this.props.numberOfNotFree,
      ticketModalToOpenFor: 0
  };

  onNumberChange = (event, ticketIndex, numberIndex) => {
      const value = event.target.value;
      const { addNumber } = this.props.pickerStore;

      addNumber(value, ticketIndex, numberIndex);
  };

  onBonusChange = (event, ticketIndex, bonusIndex) => {
      const value = event.target.value;
      const { addBonus } = this.props.pickerStore;

      addBonus(value, ticketIndex, bonusIndex);
  };

  validateValue = (valueType, value, event, ticketIndex) => {
      const { maxNumber, minNumber, maxBonus, minBonus } = this.state;
      const { ticketsData } = this.props.pickerStore;
      const inputNode = event.target;
      let isValid = true;
      switch (valueType) {
      case "bonus":
          isValid =
          value <= maxBonus &&
          value >= minBonus &&
          ticketsData[ticketIndex].pickedBonus.indexOf(value) ===
            ticketsData[ticketIndex].pickedBonus.lastIndexOf(value);
          break;
      default:
          isValid =
          value <= maxNumber &&
          value >= minNumber &&
          ticketsData[ticketIndex].pickedNums.indexOf(value) ===
            ticketsData[ticketIndex].pickedNums.lastIndexOf(value);
      }
      isValid ? inputNode.classList.remove("-invalid") : inputNode.classList.add("-invalid");
  };

  generateNumbers = ticketIndex => {
      const numsHtmlArray = [];
      const { numbersAmount } = this.state;
      const { ticketsData } = this.props.pickerStore;
      const { pickedNums } = ticketsData[ticketIndex];
      for (let x = 1; x <= numbersAmount; x++) {
          const value = pickedNums.length >= x ? pickedNums[x - 1] : undefined;
          const numHtml = (
              <input
                  key={`ticket-${ticketIndex}-num-${x}`}
                  type="number"
                  max="70"
                  min="1"
                  className={`multi-picker_ticket_input -num ${value && "-filled"}`}
                  value={value ? value : ""}
                  onChange={e => this.onNumberChange(e, ticketIndex, x - 1)}
                  onBlur={e => this.validateValue("number", value, e, ticketIndex)}
              />
          );
          numsHtmlArray.push(numHtml);
      }
      return numsHtmlArray;
  };

  generateBonuses = ticketIndex => {
      const bonusHtmlArray = [];
      const { bonusAmount } = this.state;
      const { ticketsData } = this.props.pickerStore;
      const { pickedBonus } = ticketsData[ticketIndex];
      for (let x = 1; x <= bonusAmount; x++) {
          const value = pickedBonus.length >= x ? pickedBonus[x - 1] : undefined;
          const bonusHtml = (
              <input
                  key={`ticket-${ticketIndex}-num-${x}`}
                  type="number"
                  max="70"
                  min="1"
                  className={`multi-picker_ticket_input -bonus ${value && "-filled"}`}
                  value={value ? value : ""}
                  onChange={e => this.onBonusChange(e, ticketIndex, x - 1)}
                  onBlur={e => this.validateValue("bonus", value, e, ticketIndex)}
              />
          );
          bonusHtmlArray.push(bonusHtml);
      }
      return bonusHtmlArray;
  };

  quickPick = ticketIndex => {
      const { clearTicket } = this.props.pickerStore;
      clearTicket(ticketIndex, () => {
          let singleTicketData = this.props.pickerStore.ticketsData[ticketIndex];
          this.quickPickNumber(singleTicketData, ticketIndex);
      });
  };

  quickPickNumber = (singleTicketData, ticketIndex) => {
      const { maxNumber, minNumber, numbersAmount, quickPickDelay } = this.state;
      const { addNumber } = this.props.pickerStore;
      if (singleTicketData.pickedNums.length === numbersAmount) {
          return this.quickPickBonus(singleTicketData, ticketIndex);
      }

      let newNumber = (Math.floor(Math.random() * maxNumber) + minNumber).toString();

      if (singleTicketData.pickedNums.indexOf(newNumber) !== -1) {
          return this.quickPickNumber(singleTicketData, ticketIndex);
      }

      addNumber(newNumber, ticketIndex);
      setTimeout(() => {
          this.quickPickNumber(singleTicketData, ticketIndex);
      }, quickPickDelay);
  };

  quickPickBonus = (singleTicketData, ticketIndex) => {
      const { maxBonus, minBonus, bonusAmount, quickPickDelay } = this.state;
      const { addBonus } = this.props.pickerStore;

      if (singleTicketData.pickedBonus.length === bonusAmount) {
          return;
      }

      let newBonus = (Math.floor(Math.random() * maxBonus) + minBonus).toString();

      if (singleTicketData.pickedBonus.indexOf(newBonus) !== -1) {
          return this.quickPickBonus(singleTicketData, ticketIndex);
      }

      addBonus(newBonus, ticketIndex);

      setTimeout(() => {
          this.quickPickBonus(singleTicketData, ticketIndex);
      }, quickPickDelay);
  };

  quickPickForAllMobile = () => {
      const { ticketsData } = this.props.pickerStore;
      ticketsData.forEach((ticket, index) => {
          this.quickPick(index);
      });
  };

  openMobileModal = ticketIndex => {
      noScroll.on();
      let ticketModalToOpenFor = ticketIndex || 0;

      if (!ticketIndex) {
          let ticketIsChosen = false;
          const { numbersAmount, bonusAmount } = this.state;
          const { ticketsData } = this.props.pickerStore;
          ticketsData.forEach((ticket, index) => {
              if (
                  (ticket.pickedNums.length < numbersAmount || ticket.pickedBonus.length < bonusAmount) &&
          !ticketIsChosen
              ) {
                  ticketModalToOpenFor = index;
                  ticketIsChosen = true;
              }
          });
      }

      this.setState({
          ticketModalToOpenFor,
          isMobileModalOpen: true
      });
  };

  closeMobileModal = () => {
      noScroll.off();
      this.setState({
          isMobileModalOpen: false
      });
  };

  toggleNum = num => {
      const { numbersAmount } = this.state;
      const { addNumber, removeNumber } = this.props.pickerStore;
      let pickedNums = this.props.pickerStore.ticketsData[0].pickedNums.slice();
      console.log(pickedNums);
      if (pickedNums.indexOf(num) !== -1) {
          return removeNumber(num);
      }

      if (pickedNums.length === numbersAmount) {
          return;
      }

      addNumber(num);
  };

  toggleBonus = bonus => {
      const { bonusAmount } = this.state;
      const { addBonus, removeBonus } = this.props.pickerStore;
      let pickedBonus = this.props.pickerStore.ticketsData[0].pickedBonus.slice();
      if (pickedBonus.indexOf(bonus) !== -1) {
          return removeBonus(bonus);
      }

      if (pickedBonus.length === bonusAmount) {
          return;
      }

      addBonus(bonus);
  };

  genNumbersMobileHeader = () => {
      const numCircles = [];
      const { numbersAmount, bonusAmount, ticketModalToOpenFor } = this.state;
      const { pickedNums, pickedBonus } = this.props.pickerStore.ticketsData[ticketModalToOpenFor];

      for (let x = 1; x <= numbersAmount; x++) {
          const number = pickedNums.length >= x && pickedNums[x - 1];
          const classString = `picker-mob_nums_head_circle -num-circle${number ? " -filled" : ""}`;
          numCircles.push(
              <div key={`n-${x}`} className={classString}>
                  {number}
              </div>
          );
      }

      const bonusCircles = [];

      for (let x = 1; x <= bonusAmount; x++) {
          const number = pickedBonus.length >= x && pickedBonus[x - 1];
          const classString = `picker-mob_nums_head_circle -bonus-circle${number ? " -filled" : ""}`;
          bonusCircles.push(
              <div key={`b-${x}`} className={classString}>
                  {number}
              </div>
          );
      }

      return numCircles.concat(bonusCircles);
  };

  generateNumbersMobile = maxNumber => {
	  const { minNumber, ticketModalToOpenFor } = this.state;
      let nums = [];
	  const pickedNums = this.props.pickerStore.ticketsData[ticketModalToOpenFor].pickedNums;
      for (let num = minNumber; num <= maxNumber; num++) {
          const picked = pickedNums.indexOf(num.toString()) !== -1;
          const numHtml = (
              <div
                  key={num}
                  className={`picker_nums_num ${picked ? "-picked" : ""}`}
                  onClick={() => this.toggleNum(num.toString())}
              >
                  {num}
              </div>
          );
          nums.push(numHtml);
      }
      return nums;
  };

  generateBonusNumsMobile = maxBonus => {
      const { minBonus, ticketModalToOpenFor } = this.state;
      let bonuses = [];
	  const pickedBonus = this.props.pickerStore.ticketsData[ticketModalToOpenFor].pickedBonus;
      for (let bonus = minBonus; bonus <= maxBonus; bonus++) {
          const picked = pickedBonus.indexOf(bonus.toString()) !== -1;
          const numHtml = (
              <div
                  key={bonus}
                  className={`picker_bonus_num ${picked ? "-picked" : ""}`}
                  onClick={() => this.toggleBonus(bonus.toString())}
              >
                  {bonus}
              </div>
          );
          bonuses.push(numHtml);
      }
      return bonuses;
  };

  pickerMethods = {
      generateNumbers: this.generateNumbers,
      generateBonuses: this.generateBonuses,
      onNumberChange: this.onNumberChange,
      quickPick: this.quickPick
  };

  pickerMobileMethods = {
      genNumbersMobileHeader: this.genNumbersMobileHeader,
      openMobileModal: this.openMobileModal,
      closeMobileModal: this.closeMobileModal,
      generateNumbersMobile: this.generateNumbersMobile,
      generateBonusNumsMobile: this.generateBonusNumsMobile,
	  quickPickForAllMobile: this.quickPickForAllMobile,
  };

  render() {
	  const {ticketModalToOpenFor, numbersAmount, bonusAmount} = this.state;
	  const { ticketsData } = this.props.pickerStore;
	  const {pickedNums, pickedBonus} = this.props.pickerStore.ticketsData[ticketModalToOpenFor];

      const isDone = pickedNums.length === numbersAmount && pickedBonus.length === bonusAmount;

      return (
          <Media query="(min-width: 768px)">
              {matcher =>
                  matcher ? (
                      <MultiPickerDesktop
                          ticketsData={ticketsData}
                          numberOfNotFree={this.state.numberOfNotFree}
                          numbersAmount={this.state.numbersAmount}
                          bonusAmount={this.state.bonusAmount}
                          pickerMethods={this.pickerMethods}
                          minBonus={this.state.minBonus}
                          maxNumber={this.state.maxNumber}
                          maxBonus={this.state.maxBonus}
                          minNumber={this.state.minNumber}
						  bonusName={this.state.bonusName}
                          ballsTheme={this.state.ballsTheme}						  
                      />
                  ) : (
                      <MultiPickerMobile
                          pickerMethods={this.pickerMethods}
                          pickerMobileMethods={this.pickerMobileMethods}
                          ticketsData={ticketsData}
                          numbersAmount={this.state.numbersAmount}
                          bonusAmount={this.state.bonusAmount}
                          maxNumber={this.state.maxNumber}
                          maxBonus={this.state.maxBonus}
                          ballsTheme={this.state.ballsTheme}
                          modalOpen={this.state.isMobileModalOpen}
						  ticketModalToOpenFor={this.state.ticketModalToOpenFor}
						  done={isDone}
                      />
                  )
              }
          </Media>
      );
  }
}

export default mobXConnect("pickerStore")(MultipleTicketsPickerContainer);
