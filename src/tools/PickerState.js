import { observable, decorate, extendObservable } from "mobx";

class Ticket {
    constructor() {
        extendObservable(this, {
            pickedNums: new Array(5),
            pickedBonus: new Array(1)			
        });
    }

}

class PickerState {
  ticketsData = [
      new Ticket(),
      new Ticket(),
      new Ticket(),
      new Ticket()
  ];

  addNumber = (ticketIndex, value, positionIndex) => {
      let ticketsData = [...this.ticketsData];
	  let ticket = Object.assign({}, this.ticketsData[ticketIndex]);

	  if(positionIndex || positionIndex === 0) {
          ticket.pickedNums[positionIndex] = value;		
	  }
	  else {		  
          ticket.pickedNums.push(value);
	  }

	  this.ticketsData = [...ticketsData.slice(0, ticketIndex), ticket, ...ticketsData.slice(ticketIndex + 1)];  
  };

  addBonus = (ticketIndex, value, positionIndex) => {
      let ticketsData = [...this.ticketsData];
	  let ticket = Object.assign({}, ticketsData[ticketIndex]);
	  
	  if(positionIndex || positionIndex === 0) {
          ticket.pickedBonus[positionIndex] = value;		
      }
      else {
          ticket.pickedBonus.push(value);
      }
	  
	  this.ticketsData = [...ticketsData.slice(0, ticketIndex), ticket, ...ticketsData.slice(ticketIndex + 1)];  
  };

  

  clearTicket = (ticketIndex, callback) => {
      let ticket = Object.assign({}, this.ticketsData[ticketIndex]);
      let { pickedNums, pickedBonus } = ticket;
      pickedNums.splice(0, pickedNums.length);
	  pickedBonus.splice(0, pickedBonus.length);
	  this.ticketsData.splice(ticketIndex, 1, ticket);	 
	  
	  callback();
  }
}

decorate(PickerState, { ticketsData: observable });

export default PickerState;