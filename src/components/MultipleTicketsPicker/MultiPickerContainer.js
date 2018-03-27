import React, { Component } from "react";
import MultiPickerDesktop from "./MultiPickerDesktop";

class MultipleTicketsPickerContainer extends Component {
  state = {
      ticketsData: [
          { pickedNums: [], pickedBonus: [] },
          { pickedNums: [], pickedBonus: [] },
          { pickedNums: [], pickedBonus: [] },
          { pickedNums: [], pickedBonus: [] }
      ],
      numberOfNotFree: 1,
      numbersAmount: 5,
      bonusAmount: 1,
      maxNumber: 70,
      minNumber: 1,
      maxBonus: 25,
      minBonus: 1,
      quickPickDelay: 150
  };

  onNumberChange = (event, ticketIndex, numberIndex) => {
      const value = event.target.value;
      const { ticketsData } = this.state;

      ticketsData[ticketIndex].pickedNums[numberIndex] = value;

      this.setState({ ticketsData });
  };

  onBonusChange = (event, ticketIndex, bonusIndex) => {
      const value = event.target.value;
      const { ticketsData } = this.state;

      ticketsData[ticketIndex].pickedBonus[bonusIndex] = value;

      this.setState({ ticketsData });
  };

  validateValue = (valueType, value, event, ticketIndex) => {
      const { maxNumber, minNumber, maxBonus, minBonus, ticketsData } = this.state;
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
      const { numbersAmount, ticketsData } = this.state;
      const { pickedNums } = ticketsData[ticketIndex];
      for (let x = 1; x <= numbersAmount; x++) {
          const value = pickedNums[x - 1];
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
      const { bonusAmount, ticketsData } = this.state;
      const { pickedBonus } = ticketsData[ticketIndex];
      for (let x = 1; x <= bonusAmount; x++) {
          const value = pickedBonus[x - 1];
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

  clearTicket = (ticketIndex, callback) => {
      let { ticketsData } = this.state;
      let { pickedNums, pickedBonus } = ticketsData[ticketIndex];
      pickedNums.splice(0, pickedNums.length);
      pickedBonus.splice(0, pickedBonus.length);

      ticketsData[ticketIndex].pickedNums = pickedNums;
      ticketsData[ticketIndex].pickedBonus = pickedBonus;
      this.setState(
          {
              ticketsData
          },
          () => callback && callback()
      );
  };

  quickPick = ticketIndex => {
      this.clearTicket(ticketIndex, () => {
          let singleTicketData = this.state.ticketsData[ticketIndex];
          this.quickPickNumber(singleTicketData, ticketIndex);
      });
  };

  quickPickNumber = (singleTicketData, ticketIndex) => {
      const { maxNumber, minNumber, numbersAmount, quickPickDelay } = this.state;
      if (singleTicketData.pickedNums.length === numbersAmount) {
          return this.quickPickBonus(singleTicketData, ticketIndex);
      }

      let newNumber = (Math.floor(Math.random() * maxNumber) + minNumber).toString();

      if (singleTicketData.pickedNums.indexOf(newNumber) !== -1) {
          return this.quickPickNumber(singleTicketData, ticketIndex);
      }

      singleTicketData.pickedNums.push(newNumber);
      let { ticketsData } = this.state;
      ticketsData[ticketIndex] = singleTicketData;
      this.setState(
          {
              ticketsData
          },
          () => {
              setTimeout(() => {
                  this.quickPickNumber(singleTicketData, ticketIndex);
              }, quickPickDelay);
          }
      );
  };

  quickPickBonus = (singleTicketData, ticketIndex) => {
      const { maxBonus, minBonus, bonusAmount, quickPickDelay } = this.state;
      if (singleTicketData.pickedBonus.length === bonusAmount) {
          return;
      }

      let newBonus = (Math.floor(Math.random() * maxBonus) + minBonus).toString();

      if (singleTicketData.pickedBonus.indexOf(newBonus) !== -1) {
          return this.quickPickBonus(singleTicketData, ticketIndex);
      }

      singleTicketData.pickedBonus.push(newBonus);
      let { ticketsData } = this.state;
      ticketsData[ticketIndex] = singleTicketData;
      this.setState(
          {
              ticketsData
          },
          () => {
              setTimeout(() => {
                  this.quickPickBonus(singleTicketData, ticketIndex);
              }, quickPickDelay);
          }
      );
  };

  pickerMethods = {
      generateNumbers: this.generateNumbers,
      generateBonuses: this.generateBonuses,
      onNumberChange: this.onNumberChange,
      quickPick: this.quickPick
  };

  render() {
      return (
          <MultiPickerDesktop
              ticketsData={this.state.ticketsData}
              numberOfNotFree={this.state.numberOfNotFree}
              numbersAmount={this.state.numbersAmount}
              bonusAmount={this.state.bonusAmount}
              pickerMethods={this.pickerMethods}
          />
      );
  }
}

export default MultipleTicketsPickerContainer;
