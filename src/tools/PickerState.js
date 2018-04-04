import { observable, decorate } from "mobx";

class Ticket {
  pickedNums = new Array();
  pickedBonus = new Array();
}

class PickerState {
  ticketsData = new Array();

  setNumberOfEmptyTickets = number => {
      let ticketsData = [...this.ticketsData];

      for (let x = 1; x <= number; x++) {
          ticketsData.push(new Ticket());
      }

      this.ticketsData = ticketsData;
  };

  addNumber = (value, ticketIndex = 0, positionIndex) => {
	  let ticketsData = [...this.ticketsData];
	  let ticket = this.ticketsData[ticketIndex];
      let pickedNums = [...ticket.pickedNums];

      if (positionIndex || positionIndex === 0) {
          pickedNums[positionIndex] = value;
      } else {
          pickedNums.push(value);
	  }
	  
	  ticket.pickedNums = pickedNums;

      this.ticketsData = [
          ...ticketsData.slice(0, ticketIndex),
          ticket,
          ...ticketsData.slice(ticketIndex + 1)
      ];
  };

  removeNumber = (value, ticketIndex = 0) => {
	  let ticketsData = [...this.ticketsData];
	  let ticket = this.ticketsData[ticketIndex];
      let pickedNums = [...ticket.pickedNums];

      const index = pickedNums.indexOf(value);
	  pickedNums.splice(index, 1);
	  
	  ticket.pickedNums = pickedNums;	  

      this.ticketsData = [
          ...ticketsData.slice(0, ticketIndex),
          ticket,
          ...ticketsData.slice(ticketIndex + 1)
      ];
  };

  addBonus = (value, ticketIndex = 0, positionIndex) => {
	  let ticketsData = [...this.ticketsData];
      let ticket = this.ticketsData[ticketIndex];
      let pickedBonus = [...ticket.pickedBonus];

      if (positionIndex || positionIndex === 0) {
          pickedBonus[positionIndex] = value;
      } else {
          pickedBonus.push(value);
	  }
	  
	  ticket.pickedBonus = pickedBonus;	  	  

      this.ticketsData = [
          ...ticketsData.slice(0, ticketIndex),
          ticket,
          ...ticketsData.slice(ticketIndex + 1)
      ];
  };

  removeBonus = (value, ticketIndex = 0) => {
      let ticketsData = [...this.ticketsData];
      let ticket = this.ticketsData[ticketIndex];
      let pickedBonus = [...ticket.pickedBonus];

      const index = pickedBonus.indexOf(value);
	  pickedBonus.splice(index, 1);

	  ticket.pickedBonus = pickedBonus;	  	  
	  
      this.ticketsData = [
          ...ticketsData.slice(0, ticketIndex),
          ticket,
          ...ticketsData.slice(ticketIndex + 1)
      ];
  };

  clearTicket = (ticketIndex = 0, callback) => {
      let ticketsData = [...this.ticketsData];
	  let ticket = Object.assign({}, ticketsData[ticketIndex]);
      let pickedNums = [...ticket.pickedNums];
	  let pickedBonus = [...ticket.pickedBonus];

      pickedNums.splice(0, pickedNums.length);
	  pickedBonus.splice(0, pickedBonus.length);
	  
	  ticket.pickedNums = pickedNums;
	  ticket.pickedBonus = pickedBonus;

      this.ticketsData = [
          ...ticketsData.slice(0, ticketIndex),
          ticket,
          ...ticketsData.slice(ticketIndex + 1)
      ];

      callback && callback();
  };
}

decorate(PickerState, {ticketsData: observable})

export default PickerState;
