import React, { Component } from "react";
import Media from "react-media";
import noScroll from "no-scroll";
import { object, string, number } from "prop-types";

import MultiPickerDesktop from "./MultiPickerDesktop";
import MultiPickerMobile from "./MultiPickerMobile";
import pickerLottoData from "../NumberPicker/pickerLottoData";
import { mobXConnect } from "../../tools/toolFunctions";

class MultipleTicketsPickerContainer extends Component {
  state = {
      pickerLottoData: pickerLottoData[this.props.lotto],
      quickPickDelay: 150,
      numberOfNotFree: this.props.numberOfNotFree,
      ticketModalToOpenFor: 0,
      hasError: false
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

  validateValue = (valueType, value, ticketIndex, event) => {
      const { maxNumber, minNumber, maxBonus, minBonus } = this.state.pickerLottoData;
      const { ticketsData } = this.props.pickerStore;
      const inputNode = event.target;
      let isValid = true;

      if (!value || value.length === 0) {
          return this.checkIfErrorsPresent();
      }

      switch (valueType) {
      case "bonus":
          isValid =
          value <= maxBonus &&
          value >= minBonus &&
          value.match(/^\d+$/) &&
          ticketsData[ticketIndex].pickedBonus.indexOf(value) ===
            ticketsData[ticketIndex].pickedBonus.lastIndexOf(value);
          break;
      default:
          isValid =
          value <= maxNumber &&
          value >= minNumber &&
          value.match(/^\d+$/) &&
          ticketsData[ticketIndex].pickedNums.indexOf(value) ===
            ticketsData[ticketIndex].pickedNums.lastIndexOf(value);
      }

      isValid ? inputNode.classList.remove("-invalid") : inputNode.classList.add("-invalid");

      this.checkIfErrorsPresent();
  };

  checkIfErrorsPresent() {
      let hasError = this.ballsWrap.querySelectorAll(".-invalid").length > 0;
      this.setState({
          hasError
      });
  }

  generateNumbers = ticketIndex => {
      const numsHtmlArray = [];
      const { numbersAmount } = this.state.pickerLottoData;
      const { ticketsData } = this.props.pickerStore;
      const { pickedNums } = ticketsData[ticketIndex];
      for (let x = 1; x <= numbersAmount; x++) {
          const value = pickedNums.length >= x ? pickedNums[x - 1] : undefined;
          const numHtml = (
              <input
                  key={`ticket-${ticketIndex}-num-${x}`}
                  type="text"
                  className={`multi-picker_ticket_input -num ${value && "-filled"}`}
                  value={value ? value : ""}
                  onChange={e => this.onNumberChange(e, ticketIndex, x - 1)}
                  onBlur={e => this.validateValue("number", value, ticketIndex, e)}
              />
		  );
          numsHtmlArray.push(numHtml);
      }
      return numsHtmlArray;
  };

  generateBonuses = ticketIndex => {
      const bonusHtmlArray = [];
      const { bonusAmount } = this.state.pickerLottoData;
      const { ticketsData } = this.props.pickerStore;
      const { pickedBonus } = ticketsData[ticketIndex];
      for (let x = 1; x <= bonusAmount; x++) {
          const value = pickedBonus.length >= x ? pickedBonus[x - 1] : undefined;
          const bonusHtml = (
              <input
                  key={`ticket-${ticketIndex}-num-${x}`}
                  type="text"
                  className={`multi-picker_ticket_input -bonus ${value && "-filled"}`}
                  value={value ? value : ""}
                  onChange={e => this.onBonusChange(e, ticketIndex, x - 1)}
                  onBlur={e => this.validateValue("bonus", value, ticketIndex, e)}
              />
          );
          bonusHtmlArray.push(bonusHtml);
      }
      return bonusHtmlArray;
  };

  quickPick = ticketIndex => {
	  const { clearTicket } = this.props.pickerStore;
	  const {quickPickDelay} = this.state;	  
      clearTicket(ticketIndex, () => {
		  setTimeout(() => {
              let singleTicketData = this.props.pickerStore.ticketsData[ticketIndex];
              this.quickPickNumber(singleTicketData, ticketIndex);
		  }, quickPickDelay);
      });
  };

  quickPickNumber = (singleTicketData, ticketIndex) => {
	  const { maxNumber, minNumber, numbersAmount} = this.state.pickerLottoData;
	  const {quickPickDelay} = this.state;
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
	  const { maxBonus, minBonus, bonusAmount } = this.state.pickerLottoData;
	  const {quickPickDelay} = this.state;
      const { addBonus } = this.props.pickerStore;

      if (singleTicketData.pickedBonus.length === bonusAmount) {
          if (window.innerWidth > 768) {
              this.checkIfErrorsPresent();
          }
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
          const { numbersAmount, bonusAmount } = this.state.pickerLottoData;
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

  toggleNum = (num, ticketIndex) => {
      const { numbersAmount } = this.state.pickerLottoData;
      const { addNumber, removeNumber } = this.props.pickerStore;
      let pickedNums = this.props.pickerStore.ticketsData[ticketIndex].pickedNums.slice();
      if (pickedNums.indexOf(num) !== -1) {
          return removeNumber(num, ticketIndex);
      }

      if (pickedNums.length === numbersAmount) {
          return;
      }

      addNumber(num, ticketIndex);
  };

  toggleBonus = (bonus, ticketIndex) => {
      const { bonusAmount } = this.state.pickerLottoData;
      const { addBonus, removeBonus } = this.props.pickerStore;
      let pickedBonus = this.props.pickerStore.ticketsData[ticketIndex].pickedBonus.slice();
      if (pickedBonus.indexOf(bonus) !== -1) {
          return removeBonus(bonus, ticketIndex);
      }

      if (pickedBonus.length === bonusAmount) {
          return;
      }

      addBonus(bonus, ticketIndex);
  };

  genNumbersMobileHeader = () => {
      const numCircles = [];
	  const { numbersAmount, bonusAmount } = this.state.pickerLottoData;
	  const {ticketModalToOpenFor} = this.state;
      const { pickedNums, pickedBonus } = this.props.pickerStore.ticketsData[ticketModalToOpenFor];

      for (let x = 1; x <= numbersAmount; x++) {
          const number = pickedNums.length >= x ? pickedNums[x - 1] : undefined;
          const classString = `picker-mob_nums_head_circle -num-circle${number ? " -filled" : ""}`;
          numCircles.push(
              <div key={`n-${x}`} className={classString}>
                  {number}
              </div>
          );
      }

      const bonusCircles = [];

      for (let x = 1; x <= bonusAmount; x++) {
          const number = pickedBonus.length >= x ? pickedBonus[x - 1] : undefined;
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
	  const { minNumber } = this.state.pickerLottoData;
	  const {ticketModalToOpenFor} = this.state;
      let nums = [];
      const pickedNums = this.props.pickerStore.ticketsData[ticketModalToOpenFor].pickedNums;
      for (let num = minNumber; num <= maxNumber; num++) {
          const picked = pickedNums.indexOf(num.toString()) !== -1;
          const numHtml = (
              <div
                  key={num}
                  className={`picker_nums_num ${picked ? "-picked" : ""}`}
                  onClick={() => this.toggleNum(num.toString(), ticketModalToOpenFor)}
              >
                  {num}
              </div>
          );
          nums.push(numHtml);
      }
      return nums;
  };

  generateBonusNumsMobile = maxBonus => {
	  const { minBonus } = this.state. pickerLottoData;
	  const {ticketModalToOpenFor } = this.state;
      let bonuses = [];
      const pickedBonus = this.props.pickerStore.ticketsData[ticketModalToOpenFor].pickedBonus;
      for (let bonus = minBonus; bonus <= maxBonus; bonus++) {
          const picked = pickedBonus.indexOf(bonus.toString()) !== -1;
          const numHtml = (
              <div
                  key={bonus}
                  className={`picker_bonus_num ${picked ? "-picked" : ""}`}
                  onClick={() => this.toggleBonus(bonus.toString(), ticketModalToOpenFor)}
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
      quickPickForAllMobile: this.quickPickForAllMobile
  };

  render() {
	  const {numbersAmount, bonusAmount, maxBonus, minBonus, maxNumber, minNumber, bonusName, pluralBonusName, ballsTheme} = this.state.pickerLottoData;
	  const {price} = this.props;
	  const {ticketModalToOpenFor, hasError, numberOfNotFree, isMobileModalOpen} = this.state;
      const { ticketsData } = this.props.pickerStore;
      const { pickedNums, pickedBonus } = this.props.pickerStore.ticketsData[ticketModalToOpenFor];

      const isDone = pickedNums.length === numbersAmount && pickedBonus.length === bonusAmount;

      return (
          <Media query="(min-width: 768px)">
              {matcher =>
                  matcher ? (
                      <MultiPickerDesktop
                          ticketsData={ticketsData}
                          numberOfNotFree={numberOfNotFree}
                          numbersAmount={numbersAmount}
                          bonusAmount={bonusAmount}
                          pickerMethods={this.pickerMethods}
                          minBonus={minBonus}
                          maxNumber={maxNumber}
                          maxBonus={maxBonus}
                          minNumber={minNumber}
						  bonusName={bonusName}
						  pluralBonusName={pluralBonusName}
						  ballsTheme={ballsTheme}
						  price={price}
                          hasError={hasError}
                          ballsWrapRef={node => (this.ballsWrap = node)}
                      />
                  ) : (
                      <MultiPickerMobile
                          pickerMethods={this.pickerMethods}
                          pickerMobileMethods={this.pickerMobileMethods}
                          ticketsData={ticketsData}
                          numbersAmount={numbersAmount}
                          bonusAmount={bonusAmount}
                          maxNumber={maxNumber}
						  maxBonus={maxBonus}
						  minBonus={minBonus}
						  minNumber={minNumber}
						  bonusName={bonusName}
						  pluralBonusName={pluralBonusName}
                          ballsTheme={ballsTheme}
                          modalOpen={isMobileModalOpen}
                          ticketModalToOpenFor={ticketModalToOpenFor}
                          done={isDone}
                      />
                  )
              }
          </Media>
      );
  }
}

MultipleTicketsPickerContainer.propTypes = {
    pickerStore: object.isRequired,
    numberOfNotFree: number,
    lotto: string.isRequired,
    price: string.isRequired
};

export default mobXConnect("pickerStore")(MultipleTicketsPickerContainer);
